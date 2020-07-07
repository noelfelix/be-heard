const fs = require('fs')
const path = require('path')
const util = require('util')
const exec = require('await-exec')

const { readdir } = fs.promises;
const { resolve } = path;
const srcFolder = path.resolve(__dirname, '../src/')

async function* getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const res = resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* getFiles(res);
        } else {
            yield res;
        }
    }
}

async function checkForOnly() {
    const readFile = util.promisify(fs.readFile)

    for await (const f of getFiles(srcFolder)) {
        if (f.includes('.spec.')) {
            const data = await readFile(f)
            const fileContents = data.toString()
            if (fileContents.includes('it.only(') || fileContents.includes('describe.only(')) {
                return false
            }
        }
    }
    return true
}

checkForOnly().then(passed => {
    if (!passed) {
        throw new Error("Can not have .only on any test files")
    }
})

