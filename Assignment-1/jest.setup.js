// import 'jsdom-global/register';
import "@inrupt/jest-jsdom-polyfills"

const { JSDOM } = require("jsdom");
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

