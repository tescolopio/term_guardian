const { selectionChangeHandler } = require('../contentScript');
/**
 * Tests for the selectionChangeHandler function from the contentScript module.
 *
 * Overview:
 * The selectionChangeHandler function is designed to monitor text selections within the document
 * and enable or disable a context menu based on whether the selected text includes keywords that
 * typically appear in user agreements. This suite evaluates the handler's accuracy and responsiveness
 * under a variety of scenarios to ensure it functions correctly across different user interactions.
 *
 * Scenarios Tested:
 * 1. Positive Detection: Verifies that the context menu is enabled when the selected text contains
 *    explicit user agreement keywords.
 * 2. Negative Detection: Confirms that the context menu is disabled when the selected text does not
 *    contain any agreement-related keywords.
 * 3. Partial Text Selection: Tests the handler's ability to detect agreement keywords even when only
 *    part of the relevant text is selected.
 * 4. Rapid Consecutive Changes: Assesses the handler's performance under rapid changes in text selection,
 *    simulating a user quickly selecting different parts of text.
 * 5. Empty or Whitespace Selections: Ensures that empty or whitespace-only selections correctly result
 *    in the context menu being disabled, preventing unnecessary or misleading menu activation.
 *
 * Implementation Notes:
 * - The function relies on the global window.getSelection method to determine the currently selected text.
 *   This is mocked to control the test scenarios.
 * - The global chrome.runtime.sendMessage is used to communicate the enable/disable action for the context
 *   menu, based on the selection analysis. This interaction is also mocked to verify calls.
 * - Each test simulates the 'selectionchange' event to trigger the handler, mimicking real user actions.
 */
describe('selectionChangeHandler', () => {
  beforeEach(() => {
    // Reset mocks and set up necessary mocks for each test
    jest.resetAllMocks();
    global.chrome = {
      runtime: {
        sendMessage: jest.fn()
      }
    };
    global.window.getSelection = jest.fn(() => ({
      toString: jest.fn(() => document.body.textContent)
    }));
  });

  it('should enable context menu when selected text is part of a user agreement', () => {
    document.body.textContent = 'Please review our terms of service agreement.';
    const event = new Event('selectionchange');
    document.dispatchEvent(event);

    expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({
      action: "enableContextMenu",
      enable: true
    }, expect.any(Function));
  });

  it('should disable context menu when selected text is not part of a user agreement', () => {
    document.body.textContent = 'This is just a general information page.';
    const event = new Event('selectionchange');
    document.dispatchEvent(event);

    expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({
      action: "enableContextMenu",
      enable: false
    }, expect.any(Function));
  });

  // Test handling of partial selections that include keywords
  it('should enable context menu when part of the selected text includes agreement keywords', () => {
    document.body.textContent = 'Read this terms of service document before proceeding.';
    global.window.getSelection = jest.fn(() => ({
      toString: jest.fn(() => "terms of service document before proceeding")
    }));
    const event = new Event('selectionchange');
    document.dispatchEvent(event);

    expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({
      action: "enableContextMenu",
      enable: true
    }, expect.any(Function));
  });

  // Test handling rapid consecutive changes
  it('should correctly handle rapid consecutive selection changes', () => {
    document.body.textContent = 'This is terms of service agreement content.';
    const event = new Event('selectionchange');

    global.window.getSelection = jest.fn(() => ({
      toString: jest.fn(() => "This is terms")
    }));
    document.dispatchEvent(event);

    global.window.getSelection = jest.fn(() => ({
      toString: jest.fn(() => "of service agreement content.")
    }));
    document.dispatchEvent(event);

    expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({
      action: "enableContextMenu",
      enable: true
    }, expect.any(Function));
  });

  // Test with empty or whitespace-only selections
  it('should disable context menu when selected text is empty or whitespace', () => {
    document.body.textContent = '   '; // Simulate empty or whitespace-only text
    const event = new Event('selectionchange');
    document.dispatchEvent(event);

    expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({
      action: "enableContextMenu",
      enable: false
    }, expect.any(Function));
  });
});