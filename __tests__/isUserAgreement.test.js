const { isUserAgreement } = require('../contentScript');

describe('isUserAgreement', () => {
  it('should return true if document text contains agreement keywords', () => {
    document.body.textContent = 'This document serves as a privacy policy.';
    expect(isUserAgreement()).toBeTruthy(); // Removed the misleading argument

    document.body.textContent = 'Please review our terms of service.';
    expect(isUserAgreement()).toBeTruthy(); // Adjusted test to reflect actual function usage
  });

  it('should return false if document text does not contain agreement keywords', () => {
    document.body.textContent = 'This is a general information page.';
    expect(isUserAgreement()).toBeFalsy(); // Reflecting the correct check
  });
});
