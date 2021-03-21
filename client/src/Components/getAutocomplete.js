var TrieSearch = require('./autoComplete');
var dict = require('../nyse-listed_json.json');

var ts = new TrieSearch("Company Name");
ts.addAll(dict);

module.exports = ts;