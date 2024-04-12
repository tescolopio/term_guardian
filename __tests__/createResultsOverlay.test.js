const { createResultsOverlay } = require('../contentScript');

describe('createResultsOverlay', () => {
  it('should create and append an overlay to the document body', () => {
    const analysisResults = {
      clarityGrade: 'A',
      contentGrade: 'B',
      keyExcerpts: 'Sample excerpt',
      reasons: 'Well structured'
    };
    createResultsOverlay(analysisResults);
    expect(document.createElement).toHaveBeenCalledWith('div');
    expect(document.body.appendChild).toHaveBeenCalled();
  });
});