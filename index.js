const fs = require('fs');
const Handlebars = require('handlebars'); 

const TEMPLATE_LOCATION = './input/template.html';
const DATA_LOCATION = './input/data.json';
const OUTPUT_LOCATION = './output/output.html';

let template = fs.readFileSync(TEMPLATE_LOCATION, 'utf8');
let data = require(DATA_LOCATION);
const liveServer = require("live-server");

const debugLog = (...args) => {
  if (process.env.DEBUG) {
    console.log(`DEBUG -- `, ...args);
  }
}

// Add addtion, subtraction, multiplication, and division helpers
Handlebars.registerHelper('add', function(a, b) {
  return a + b;
});
Handlebars.registerHelper('subtract', function(a, b) {
  return a - b;
});

Handlebars.registerHelper('multiply', function(a, b) {
  return a * b;
});

Handlebars.registerHelper('divide', function(a, b) {
  return a / b;
});

Handlebars.registerHelper('eq', (a, b) => a == b)

Handlebars.registerHelper('for', function(from, to, incr, block) {
  var accum = '';
  for(var i = from; i < to; i += incr)
      accum += block.fn(i);
  return accum;
});


let compileAndReload = () => {
  try {

    let compiled = Handlebars.compile(template);
    let output = compiled(data);
    
    fs.writeFileSync(OUTPUT_LOCATION, output);
  } catch (e) {
    console.error(
      '❌ Error: Could not compile template or write output file.'
    );
    console.error(e.message);
  }
}

fs.watch(TEMPLATE_LOCATION, async () => {
  // wait 200ms for file to be written
  await new Promise((resolve) => setTimeout(resolve, 200));

  debugLog('🔄 Template updated, recompiling...');

  template = fs.readFileSync(TEMPLATE_LOCATION, 'utf8');
  if (!template) {
    console.error('❌ Error: Could not read template file.');
    return;
  }
  compileAndReload();
});

fs.watch(DATA_LOCATION, async () => {
  // wait 200ms for file to be written
  await new Promise((resolve) => setTimeout(resolve, 200));

  data = fs.readFileSync(DATA_LOCATION, 'utf8');
  if (!data) {
    console.error('❌ Error: Could not read data file.');
    return;
  }
  data = JSON.parse(data);
  debugLog('🔄 Data updated, recompiling...');
  debugLog('new data: ', data);
  compileAndReload();  
});

// initial compile and live reload setup
compileAndReload();

// ...compile and write output code 
const outputFolder = OUTPUT_LOCATION.split('/').slice(0, -1).join('/');
const outputFileName = OUTPUT_LOCATION.split('/').slice(-1)[0];

console.log('📂 Serving files from:', outputFolder);
console.log('📄 Serving file:', outputFileName);

const params = {
  port: 8181,
  root: outputFolder, // Set root directory that's being served. Defaults to cwd.
  open: true, // open browser on start
  file: outputFileName, // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
  wait: 200
};

liveServer.start(params);