const { isUserAgreement } = require('../contentScript');

/**
 * Tests for isUserAgreement function.
 *
 * Overview:
 * This function checks the content of the document body to determine if it likely contains
 * text that pertains to a user agreement. This suite tests various content scenarios to 
 * ensure reliable identification of user agreement-related text.
 *
 * Test Cases:
 * 1. Test with explicit user agreement keywords to verify positive detection.
 * 2. Test with non-agreement text to confirm negative detection.
 * 3. Test with mixed content to assess the function's ability to detect agreement terms 
 *    amidst unrelated text.
 * 4. Test edge cases with minimal text and variations in casing and spacing.
 */
describe('isUserAgreement', () => {
  // Test various cases where the agreement should be detected
  const positiveCases = [
    'This document serves as a privacy policy.',
    'Please review our terms of service.',
    'The user agreement is detailed here.',
    'Refer to our license agreement for more information.'
  ];
  
  positiveCases.forEach(text => {
    it(`should return true for text: "${text}"`, () => {
      document.body.textContent = text;
      expect(isUserAgreement()).toBeTruthy();
    });
  });

  // Test cases where the agreement should not be detected
  const negativeCases = [
    'This is a general information page.',
    'Welcome to our homepage.',
    'Learn more about our services.',
    'Contact us for more details.'
  ];

  negativeCases.forEach(text => {
    it(`should return false for text: "${text}"`, () => {
      document.body.textContent = text;
      expect(isUserAgreement()).toBeFalsy();
    });
  });

  // Test edge cases for reliability
  it('should return true even with mixed additional content around agreement keywords', () => {
    document.body.textContent = 'This site uses a privacy policy, among other policies.';
    expect(isUserAgreement()).toBeTruthy();
  });

  it('should handle case sensitivity by returning true for mixed case agreement keywords', () => {
    document.body.textContent = 'Our Terms Of Service are comprehensive.';
    expect(isUserAgreement()).toBeTruthy();
  });

  it('should return false for text that nearly matches agreement keywords', () => {
    document.body.textContent = 'Our terms are simple.';
    expect(isUserAgreement()).toBeFalsy();
  });
});
