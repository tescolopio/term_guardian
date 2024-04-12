module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'], // This ensures the setup file runs after the testing framework is set up
  testEnvironment: 'jsdom', // Uses jsdom to simulate the browser environment
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest' // Transforms JSX and/or TypeScript files using Babel
  },
};
