module.exports = {
    roots: ["<rootDir>/src"],
    moduleDirectories: ["node_modules", "src"],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(spec))\\.(ts|tsx)?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    setupFilesAfterEnv: ["<rootDir>/src/setupEnzyme.ts", "jest-sinon"],
    moduleNameMapper: {
        "\\.(css|scss)$": "identity-obj-proxy"
    },
    globals: {
        __DEV__: true,
        __TEST__: false,
        __PROD__: false,
        __DEBUG__: false,
        __LOCAL_DEV__: false,
        __PATH__: '/'

    }
}