module.exports = {
  roots: ['<rootDir>/src'],

  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFiles: ['jest-localstorage-mock', './jest.setup.ts'],

  testEnvironment: 'jsdom',
  testRegex: '(/src/(?!mocks).*\\.(test|spec))\\.tsx?$',

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.cjs',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.cjs',
    '^__mocks__\\\\(.*)$': '<rootDir>/__mocks__/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/mocks/**/*.{ts,tsx}',
    '!src/main.tsx',
    '!src/globals.d.ts',
    '!src/vite-env.d.ts',
  ],
};
