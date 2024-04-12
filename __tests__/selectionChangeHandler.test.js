const { selectionChangeHandler } = require('../contentScript');

describe('selectionChangeHandler', () => {
  beforeEach(() => {
    // Reset mocks and set up necessary mocks for each test
    jest.resetAllMocks();  // Assuming resetAllMocks resets all jest mocks
    global.chrome = {
      runtime: {
        sendMessage: jest.fn()
      }
    };
    // Mocking window.getSelection to simulate user text selection
    global.window.getSelection = jest.fn(() => ({
      toString: jest.fn(() => document.body.textContent)
    }));
  });

  it('should enable context menu when selected text is part of a user agreement', () => {
    document.body.textContent = 'Please review our terms of service agreement.';
    const event = new Event('selectionchange');
    document.dispatchEvent(event);  // Simulate a selection change event

    expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({
      action: "enableContextMenu",
      enable: true
    }, expect.any(Function));
  });

  it('should disable context menu when selected text is not part of a user agreement', () => {
    document.body.textContent = 'This is just a general information page.';
    const event = new Event('selectionchange');
    document.dispatchEvent(event);  // Simulate a selection change event

    expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({
      action: "enableContextMenu",
      enable: false
    }, expect.any(Function));
  });
});
