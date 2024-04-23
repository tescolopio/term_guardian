// jest.setup.js

// Global setup for chrome API mocks
global.chrome = {
  runtime: {
    sendMessage: jest.fn(),
    onMessage: {
      addListener: jest.fn()
    },
    lastError: null
  }
};

// Function to configure dynamic responses and errors for chrome.runtime.sendMessage
function setupChromeRuntimeMocks(response = {}, error = null) {
  global.chrome.runtime.sendMessage.mockImplementation((message, callback) => {
    callback(response);
    if (error) {
      global.chrome.runtime.lastError = { message: error };
      setTimeout(() => {
        delete global.chrome.runtime.lastError;
      }, 0);
    }
  });
}

// Mock for document.body with essential methods
Object.defineProperty(global.document, 'body', {
  value: {
    textContent: 'This is a sample terms of service text.',
    appendChild: jest.fn(),
    removeChild: jest.fn()
  },
  writable: true,
  configurable: true // Allows re-definition in tests if needed
});

// Mock for document.createElement
global.document.createElement = jest.fn().mockImplementation(tagName => {
  return {
    setAttribute: jest.fn(),
    innerHTML: '',
    style: {},
    addEventListener: jest.fn(),
    remove: jest.fn(),
    appendChild: jest.fn(),
    tagName: tagName.toUpperCase()
  };
});

// Set up Jest lifecycle hooks to reset and restore mocks
beforeEach(() => {
  // Reset mocks before each test
  jest.resetAllMocks();
  
  // Set up default or test-specific Chrome runtime behavior
  setupChromeRuntimeMocks();  // Calls with no args set defaults
});

afterEach(() => {
  // Ensure all global changes are cleaned up
  if (global.chromeResponse) delete global.chromeResponse;
  if (global.chromeLastError) delete global.chromeLastError;
});
