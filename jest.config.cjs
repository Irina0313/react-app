module.exports = {
  roots: ['<rootDir>/src'],

  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  /*   setupFilesAfterEnv: [
    '@testing-library/react/cleanup-after-each',
    '@testing-library/jest-dom/extend-expect',
  ],
 */
  testEnvironment: 'jsdom',
  testRegex: '(/src/.*\\.(test|spec))\\.tsx?$',
  setupFiles: ['jest-localstorage-mock'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.cjs',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.cjs',
    '^__mocks__\\\\(.*)$': '<rootDir>/__mocks__/$1',
  },
};
