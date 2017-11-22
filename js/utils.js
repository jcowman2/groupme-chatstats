/*
 * Converts every object in an array into one of their properties.
 * -> prop: the property to which all objects will be mapped
 */
Array.prototype.toProperty = function(prop) {
  return this.map(entry => entry[prop]);
}

/*
 * Converts an array of objects and groups them into arrays associated with the
 * range of a given groupingFunction.
 * -> groupingFunction: function of form (value) => {...return x} that returns
 *    a value for every element in the array
 * EXAMPLE: [1,2,3,4,5,6].groupBy(e => (e % 2 == 0) ? 'even' : 'odd') == {'odd':[1,3,5], 'even':[2,4,6]}
 */
Array.prototype.groupBy = function(groupingFunction) {
  let groupedMap = new Map();

  this.forEach(element => {
    let groupKey = groupingFunction(element);
    groupedMap.doIfPresent(groupKey, (map, arr) => arr.push(element), (map) => map.set(groupKey,[element]));
  });

  return groupedMap;
}

/*
 * Allows for two setting behaviors on a Map depending on if the key is already set.
 * -> key: the key to be mapped
 * -> ifPresent: function of form '(value) => {...return x}' to be called if the key is already set,
      the output of which will be the new mapping of the key.
 * -> ifNotPresent: function of form '() => {...return x}' to be called if the key is not already set,
      the output of which will be the new mapping of the key.
 */
Map.prototype.setIfPresent = function(key, ifPresent, ifNotPresent) {
  if (this.has(key)) {
    this.set(key, ifPresent(this.get(key)));
  } else {
    this.set(key, ifNotPresent());
  }
}

/*
 * Allows for two custom behaviors on a Map depending on if the key is already set.
 * Note: the output of these behaviors is not automatically set in the map.
 * -> key: the key to be mapped
 * -> ifPresent: function of form '(map, value) => {...}' to be called if the key is already set
 * -> ifNotPresent: function of form '(map) => {...}' to be called if the key is not already set
 */
Map.prototype.doIfPresent = function(key, ifPresent, ifNotPresent) {
  if (this.has(key)) {
    ifPresent(this, this.get(key));
  } else {
    ifNotPresent(this);
  }
}

/*
 * Formats a string with a series of arguments.
 * -> ...args: series of arguments to be placed in string
 * EXAMPLE: 'The {0} is dead. Don\'t code {0}. Code {1} that is open source!'.format('ASP', 'PHP');
 * (Credit: https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format)
 */
String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};