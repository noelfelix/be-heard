import webpack, {RuleSetRule} from 'webpack'
import {CleanWebpackPlugin} from 'clean-webpack-plugin'
import projectConfig from '../config/project.config'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'

export const rules: Array<RuleSetRule> = [
        {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            options: {
                babelrc: false,
                presets: [
                    [ '@babel/preset-env', {
                        targets: {
                            browsers: [ 'last 1 version', 'ie >= 11' ]
                        }
                    }]
                ]
            }
        },
        {
            test: /\.(js|ts|tsx|jsx)$/,
            enforce: 'pre',
            use: [
                {
                    options: {
                        eslintPath: require.resolve('eslint'),
                        emitWarning: true
                    },
                    loader: require.resolve('eslint-loader')
                }
            ],
            exclude: /node_modules/
        },
        {
            test: /\.scss$/i,
            use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                {
                    loader:'css-loader',
                    options: {
                        sourceMap: true,
                    }
                },
                // Compiles Sass to CSS
                'sass-loader'
            ]
        },{
            test: /\.css$/i,
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        modules: true
                    }
                }
            ]
        }, {
            test: /\.svg$/,
            include: [/src(\/|\\)assets/],
            use: [
                {loader: 'svg-sprite-loader'},
                {
                    loader: 'svgo-loader',
                    options: {
                        plugins: [{removeTitle: false}]
                    }
                },
                {loader: 'svgo-loader'}
            ]
        },
        {
            // SVG File Loader (for css/background urls)
            test: /\.svg$/,
            include: /src(\/|\\)assets(\/|\\)images/,
            loader: 'url-loader'
        }
    ]

export const getPlugins = (env:any, publicPath: string) => {
    const definePlugin = new webpack.DefinePlugin(Object.assign(
        {
            __LOCAL_DEV__: JSON.stringify(env?.LOCAL_DEV ?? false),
            __PATH__: JSON.stringify(publicPath),
        }, Object.keys(projectConfig).reduce((acc, key) =>
            ({...acc, [key]: JSON.stringify(projectConfig[key])}), {})))

    const copyPlugin = new CopyWebpackPlugin([
        {
            from: path.resolve(__dirname, '../static'),
            to: path.resolve(__dirname, '../dist/static'),
        },
        {
            to: path.resolve(__dirname, '../dist/WEB-INF'),
            from: path.resolve(__dirname, '../tomcat/WEB-INF')
        }
    ])

    const providerPlugin = new webpack.ProvidePlugin({
        Promise: 'es6-promise-promise', // works as expected
    });

    return [definePlugin, copyPlugin, providerPlugin, new CleanWebpackPlugin()]
}

