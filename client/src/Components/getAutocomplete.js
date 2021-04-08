var PrefixMatch = require('./autoComplete');
var dict = require('../nyse-listed_json.json');

var ts = new PrefixMatch("Company Name");
ts.createPrefixTree(dict);

module.exports = ts;