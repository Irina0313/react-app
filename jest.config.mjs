import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: ['**/*.{ts,tsx}', '!mocks/**/*.{ts,tsx}'],
};

export default createJestConfig(config);
