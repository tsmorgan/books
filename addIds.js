const fs = require('fs');
const { JSDOM } = require('jsdom');

/* Just edit this line */
let book = 'witw';



// Read the HTML file
fs.readFile(book+'/index.html', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Use JSDOM to parse the HTML
  const dom = new JSDOM(data);
  const document = dom.window.document;

  // Get all <p> elements
  const paragraphs = document.querySelectorAll('p');

  // Add a unique id to each <p> element
  paragraphs.forEach((p, index) => {
    p.setAttribute('id', `paragraph-${index + 1}`);
  });

  // Output the modified HTML
  const updatedHTML = dom.serialize();

  // Write the updated HTML to a new file
  fs.writeFile(book+'/index.html', updatedHTML, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Updated HTML saved as output.html');
  });
});
