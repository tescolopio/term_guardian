const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { window } = new jsdom.JSDOM(`
<html>
<head></head>
  <body>
    <div class="privacy-policy">Privacy Policy Content</div>
    <div id="terms-of-service">Terms of Service Content</div>
    <article data-privacy-policy="">Article Privacy Policy Content</article>
    <section data-terms-of-service="">Section Terms of Service Content</section>
  </body>
</html>
`);

module.exports = { window };