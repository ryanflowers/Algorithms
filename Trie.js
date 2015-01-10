function Node() {
  this.partialWords = {};
  this.children = {};
  this.isCompleteWord = false;    
}


function Trie() {
  var root;
  
  this.insert = function(word) {
    word = word || '';
    if(word.length === 0){
      throw error('Word cannot be null or emtpy');      
    }
    
    if(!root) {
      root = new Node();
    }
    
    insertChild(root, word);
  };
  
  function insertChild(node, word) {
    
    if(word.length === 0){
      node.isCompleteWord = true;  
      return;
    }
        
    var childChar = word.charAt(0);
    if(!node.children[childChar]){
        node.children[childChar] = new Node();
    }
    
    var remainder = word.substring(1,word.length); 
    if(remainder.length > 0 && !node.children[childChar].partialWords[remainder]) {
        node.children[childChar].partialWords[remainder] = remainder;          
    }
    
    insertChild(node.children[childChar], remainder);
  }
   
  this.find = function(prefix) {
    console.log('printing all words under given prefix');
    if(!prefix){
      console.log('nothing to find');
      return;
    }

    var node = findNode(root, prefix, 0);
    if(node != null){
      execOnAllProperties(node.partialWords, function(word) {
        console.log(word);
      });
    }
  };
  
  function findNode(node, prefix, prefixPosition) {
    
    var nodeFound;
    if(prefixPosition == prefix.length){
      nodeFound = node;
    }
    
    execOnAllProperties(node.children, function(child){
      if(prefix.charAt(prefixPosition) === child){
         nodeFound = findNode(node.children[child], prefix, ++prefixPosition);
      }  
    });
    
    return nodeFound;
  }
  
  this.print = function(){ 
    console.log('printing all current words stored');
    if(!root){
      console.log('nothing to print');
      return;
    }
    printNode(root, '');    
  };
  
  function printNode(node, currentWord){
      
    if(node.isCompleteWord){
        console.log(currentWord);    
    }
    
    execOnAllProperties(node.children, function(child) {
      printNode(node.children[child], currentWord.slice(0) + child);
    });    
  }
  
  function execOnAllProperties(properties, callback){
   for(var property in properties){
      if(properties.hasOwnProperty(property)){
        callback(property);
      }      
    }
  }
}

var trie = new Trie();

trie.insert('abcd');
trie.insert('adg');
trie.insert('ahdscd');
trie.find('a');
trie.print();
