/**
 * Test suite for sendTextForAnalysis function in contentScript.js.
 *
 * This function is crucial for initiating the text analysis process by sending selected text
 * to the background script. It needs to correctly handle the sending process, including formatting
 * the message and handling any potential errors that might occur during message sending.
 *
 * Tests included:
 * - Ensures that the text is sent correctly with the proper message structure.
 * - Verifies that errors in the chrome.runtime.sendMessage function are handled gracefully.
 */
const contentScript = require('../contentScript');
global.chrome = require('sinon-chrome/runtime');
const jsdom = require('jsdom');
const setup = require('../setup.js');

describe('sendTextForAnalysis', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // Reset all mocks before each test
    global.chrome = {
      runtime: {
        sendMessage: jest.fn((msg, callback) => {
          if (msg.text === 'privacy policy') {
            global.chrome.runtime.lastError = { message: 'Failed to send' };
            callback();
          } else {
            callback({ success: true });
            global.chrome.runtime.lastError = null;
          }
        }),
        lastError: null
      }
    };
    console.error = jest.fn();
  });

  afterEach(() => {
    global.chrome.runtime.lastError = null; // Ensure lastError is cleared after each test
  });

  it('should send text to the background script for analysis', async () => {
    const text = 'terms of service';
    await contentScript.sendTextForAnalysis(text);
    expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({
      action: "analyzeText",
      text: text
    }, expect.any(Function));
  });

  it('should handle errors when sending message fails', async () => {
    const text = 'privacy policy';
    await contentScript.sendTextForAnalysis(text);
    expect(console.error).toHaveBeenCalledWith('Error sending message to background script:', 'Failed to send');
    expect(chrome.runtime.sendMessage).toHaveBeenCalled();
  });
});