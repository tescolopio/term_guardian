const { createResultsOverlay } = require('../contentScript');

/**
 * Tests for the createResultsOverlay function from the contentScript module.
 *
 * Overview:
 * The createResultsOverlay function is responsible for creating a DOM element
 * (a 'div') that serves as an overlay to display analysis results. This test suite
 * ensures that the function correctly creates the element, sets its properties,
 * and appends it to the document body.
 *
 * Each test within this suite is isolated with the help of beforeEach and afterEach
 * hooks that set up and tear down the necessary mocks. Specifically, document.createElement
 * is mocked to track calls and inspect the properties of created elements.
 *
 * Test Details:
 * - beforeEach: Sets up document.createElement to return a mock div element with
 *   necessary methods like setAttribute, appendChild, and others that might be called
 *   within the function. This mock helps in asserting various manipulations performed
 *   by the createResultsOverlay function.
 *
 * - afterEach: Clears all mock usage data to prevent test leakage, ensuring that each
 *   test starts with a fresh state.
 *
 * - Test Case: "should create and append an overlay to the document body"
 *   This test verifies that the function creates a div element, configures it with
 *   the correct attributes and content based on the provided analysisResults, and
 *   correctly appends it to the document body. Assertions check the method calls and
 *   arguments on the mock to confirm that the function behaves as expected.
 */

describe('createResultsOverlay', () => {
  // Setup the document.createElement mock before each test
  beforeEach(() => {
    document.createElement = jest.fn().mockImplementation(tagName => {
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
  });

  // Clean up after each test to ensure mocks don't leak state
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mock call information
  });

  // Test case: Checking if the overlay is created and appended correctly
  it('should create and append an overlay to the document body', () => {
    // Mock the document.body.appendChild method
    document.body.appendChild = jest.fn();

    // Prepare the results data for the overlay
    const analysisResults = {
      clarityGrade: 'A',
      contentGrade: 'B',
      keyExcerpts: 'Sample key excerpts from the analysis.',
      reasons: 'Details why the given grades were assigned.'
    };

    // Call the function with the mocked data
    createResultsOverlay(analysisResults);

    // Assert that a 'div' was created
    expect(document.createElement).toHaveBeenCalledWith('div');

    // Assert that the created 'div' element is set up correctly
    const createdDiv = document.createElement.mock.results[0].value;
    expect(createdDiv.setAttribute).toHaveBeenCalledWith('id', 'termsGuardianResultsOverlay');
    expect(createdDiv.innerHTML).toContain('Agreement Analysis Results'); // Check if innerHTML contains specific content
    expect(createdDiv.innerHTML).toContain(analysisResults.clarityGrade);
    expect(createdDiv.innerHTML).toContain(analysisResults.contentGrade);
    expect(createdDiv.innerHTML).toContain(analysisResults.keyExcerpts);
    expect(createdDiv.innerHTML).toContain(analysisResults.reasons);

    // Assert that the overlay div is appended to the document body
    expect(document.body.appendChild).toHaveBeenCalledWith(createdDiv);
  });
});
