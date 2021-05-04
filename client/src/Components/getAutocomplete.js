var PrefixMatch = require('./autoComplete');
var dict = require('../wilshire5000.json');

var ts = new PrefixMatch("Company Name");
ts.createPrefixTree(dict);

module.exports = ts;