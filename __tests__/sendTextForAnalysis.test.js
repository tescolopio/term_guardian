const { sendTextForAnalysis } = require('../contentScript');

describe('sendTextForAnalysis', () => {
  beforeEach(() => {
    // Reset and setup the mock before each test
    jest.resetAllMocks();
    global.chrome = {
      runtime: {
        sendMessage: jest.fn((message, callback) => {
          callback({}); // Simulate a callback if needed
        }),
        lastError: null
      }
    };
  });

  afterEach(() => {
    // Clean up if there's any specific teardown needed
    jest.clearAllMocks();
  });

  it('should send the text to the background script', () => {
    // Arrange
    const text = 'This is some text';
    const expectedMessage = { action: 'analyzeText', text };

    // Act
    sendTextForAnalysis(text);

    // Assert
    expect(chrome.runtime.sendMessage).toHaveBeenCalledWith(expectedMessage, expect.any(Function));
  });
});