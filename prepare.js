// Usage: node prepare.js <book_name> ["link text"]
// Expects <book_name>/index.html to contain the raw HTML.
const fs = require("fs");
const { JSDOM } = require("jsdom");

const book = process.argv[2];
if (!book) {
  console.error("Usage: node prepare.js <book_name>");
  process.exit(1);
}
const file = `${book}/index.html`;
let html = fs.readFileSync(file, "utf8");

// Remove all existing <style> elements (a string replace also catches ones inside <template>s)
html = html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");

// Step one: join lines where text should run on
html = html.replace(/\r\n/g, "\n").replace(/([^>])\n([^<\s])/g, "$1 $2");

const dom = new JSDOM(html);
const document = dom.window.document;

// Remove the Gutenberg header element
document.getElementById("pg-header")?.remove();

// Remove all images
document.querySelectorAll("img").forEach((img) => img.remove());

// Step two: stylesheet, script tags and Contents id
if (!document.querySelector('link[href="../style.css"]')) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "../style.css";
  document.head.appendChild(link);
}

if (!document.querySelector('script[src="../script.js"]')) {
  const vars = document.createElement("script");
  vars.textContent = `var book = ${JSON.stringify(book)};`;
  const lib = document.createElement("script");
  lib.src = "../script.js";
  document.body.append(vars, lib);
}

if (!document.getElementById("Contents")) {
  const heading = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,div,a")].find(
    (el) => /^\s*(table of )?contents\s*$/i.test(el.textContent)
  );
  if (heading) {
    heading.id = "Contents";
  } else {
    console.warn('Could not find a contents element; add id="Contents" manually.');
  }
}

// Step three: ids on every <p>
document.querySelectorAll("p").forEach((p, i) => {
  p.setAttribute("id", `paragraph-${i + 1}`);
});

fs.writeFileSync(file, dom.serialize());
console.log(`Updated ${file}`);

// Add a link to the root index.html if there isn't one already
const rootFile = "index.html";
const rootHtml = fs.readFileSync(rootFile, "utf8");
if (rootHtml.includes(`href="${book}/"`)) {
  console.log(`${rootFile} already links to ${book}/`);
} else {
  const label = process.argv[3] || book;
  const item = `      <li><a href="${book}/">${label}</a></li>\n`;
  fs.writeFileSync(rootFile, rootHtml.replace(/^([ \t]*)<\/ul>/m, item + "$1</ul>"));
  console.log(`Added ${book} to ${rootFile}`);
}
