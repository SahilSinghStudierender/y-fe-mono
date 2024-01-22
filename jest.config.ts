module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testPathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/dist/",
        "<rootDir>/src/test.ts",
    ],
};
