var TrieSearch = require('./autoComplete');
//var dict = require('./nyse-listed_json.json');
var dict = require('../test.json');

// var ts = new TrieSearch(
//     null,
//     {
//         cache: false,
//     }
// );
var ts = new TrieSearch("Company Name");
ts.addAll(dict);
// var object = {
//     'andrew': {age: 21},
//     'andy': {age: 37},
//     'andrea': {age: 25},
//     'annette': {age: 67},
// };

// var ts = new TrieSearch();
// ts.addFromObject(object);

// console.log('Dictionary loaded into TrieSearch.');
// console.log(ts.get('ad'));
//console.log(ts.get('and')[0]['_key_']);
module.exports = ts;