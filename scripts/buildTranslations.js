#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const util = require('util')
const {Translate} = require('@google-cloud/translate').v2;

const CHUNK_SIZE = 100;
const locales = path.resolve(__dirname, '../static/locales')

// Creates a client
const translate = new Translate();

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const supportedLanguages = ['ar', 'da', 'de', 'es', 'fr', 'he', 'it', 'ja', 'nl', 'pl', 'pt', 'ru', 'sv', 'tr', 'zh']

async function translateText() {
    const en = await readFile(locales + '/en.json')
    const enJSONTemp = JSON.parse(en.toString())
    const keys = Object.keys(enJSONTemp).sort((a, b) => {
        if(a < b) { return -1; }
        if(a > b) { return 1; }
        return 0;
    })
    const enJSON = {}
    keys.forEach(key => {
        enJSON[key] = key
    })

    for (var j = 0; j < supportedLanguages.length; j++) {
        const curLanguage = supportedLanguages[j]

        const langFile = await readFile(locales + `/${curLanguage}.json`)
        const curLangFile = JSON.parse(langFile.toString())

        let curPosition = 0;
        while(true) {
            let translateValues = []
            const translationMap = {}
            for (let i = 0; curPosition < keys.length && i < CHUNK_SIZE;) {
                if (curLangFile[keys[curPosition]] === undefined) {
                    const key = keys[curPosition]
                    translateValues.push(enJSON[key])
                    translationMap[i] = key
                    i++
                }
                curPosition += 1
            }

            if (translateValues.length > 0) {
                console.log(`Translating ${translateValues.length} new terms for ${curLanguage}`)
                try {
                    let [translations] = await translate.translate(translateValues, {
                        to: curLanguage,
                        detectedSourceLanguage: 'en'
                    });
                    translations = Array.isArray(translations) ? translations : [translations];

                    translations.forEach((translation, i) => {
                        curLangFile[translationMap[i]] = translation
                    })
                } catch(e) {
                    console.log('Failed to get new translations', e)
                }
            }

            if (curPosition >= keys.length) {
                break
            }
        }
        // cleanup old keys
        let keyCleanupCount = 0
        Object.keys(curLangFile).map(curKey => {
            if (enJSON[curKey] === undefined) {
                delete curLangFile[curKey]
                keyCleanupCount++
            }
        })
        if (keyCleanupCount > 0) {
            console.log(`Cleaned up ${keyCleanupCount} keys that are no longer used for ${curLanguage}`)
        }

        await writeFile(locales + `/${curLanguage}.json`, JSON.stringify(curLangFile))
    }

    await writeFile(locales + '/en-US.json', JSON.stringify(enJSON))
    await writeFile(locales + '/en.json', JSON.stringify(enJSON, null, '\t'))
}

translateText()
.then(() => {
    console.log('Success')
}).catch((e) => {
    console.log('Error:', e)
})