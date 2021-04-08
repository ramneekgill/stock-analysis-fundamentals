var PrefixMatch = function (keyField) {
    this.jsonKey = keyField;
    this.root = {};
    this.size = 0;
  };
  
  var PrefixTree = require('hasharray');
  
  PrefixMatch.prototype = {
    createPrefixTree: function (arr) {
      for (var i = 0; i < arr.length; i++) {
        var stockObj = arr[i];
        var companyName = stockObj[this.jsonKey];
        this.splitWords(companyName, stockObj);
      }
    },
    //Create the Prefix Tree through insertion
    splitWords: function (objValue, obj) {
      var words = objValue.split(" ");
      for (var i = 0, l = words.length; i < l; i++) {
        if (!words[i].includes(" ")) {
          objValue = words[i].toLowerCase();
          this.newNode(objValue.split(''), obj, this.root);
        }
      }
    },
    //Create node which contains each letter connected for each value passed from json object field with
    //the final value in the tree being the object connected to that word.
    newNode: function (nodeKeys, value, node) {
      while(nodeKeys.length > 0){
        var k = nodeKeys.shift();
        if (!node[k])
          this.size++;
        node[k] = node[k] || {};
        node = node[k];
      }
      node['value'] = node['value'] || [];
      node['value'].push(value);
    },
    //Get The object for a specific search term
    findObj: function (key) {
      var keySplit = key.split('');
      var obj = this.root;
      while(obj){
        if (keySplit.length == 0) return obj;
        obj = obj[keySplit.shift()];
      }
      return undefined;
    },
    searchTree: function (searchTerm) {
      searchTerm = searchTerm.toLowerCase();
      var matchedValues = undefined;
      var objField = this.jsonKey;
      var splitSearchTerm = searchTerm.split(" ");
      var obj;
  
      for (var w = 0, l = splitSearchTerm.length; w < l; w++){
        if (splitSearchTerm[w].length < 1) continue;
        var matchTree = new PrefixTree(objField);
        if (obj = this.findObj(splitSearchTerm[w])){
          insertMatch(obj, matchTree);
        }
        matchedValues = matchedValues ? matchedValues.intersection(matchTree) : matchTree;
      }
  
      return matchedValues ? matchedValues.all : [];
      
      function insertMatch(node, matchTree) {
        if (node.value && node.value.length) {
          matchTree.addAll(node.value);
        }
  
        for (var k in node) {
          if (k != 'value') {
            insertMatch(node[k], matchTree);
          }
        }
      }
    },
    //Get the objects that match the keywords in the searchTerm input
    findMatches: function (searchTerm) {
      var objField = this.jsonKey;
      var matchedValues = this.searchTree(searchTerm);
      var matchedPrefixTree = new PrefixTree(objField).addAll(matchedValues);
      return matchedPrefixTree.all;
    }
  };
  module.exports = PrefixMatch;