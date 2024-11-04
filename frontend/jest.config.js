module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
      '\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-stub',
    },
    transformIgnorePatterns: [
      'node_modules/(?!axios|react-konva)',
    ],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    testEnvironment: 'jsdom',
  };
  