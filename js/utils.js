/*
 * Converts every object in an array into one of their properties.
 * -> prop: the property to which all objects will be mapped
 */
Array.prototype.toProperty = function(prop) {
  return this.map(entry => entry[prop]);
}

/*
 * Allows for two setting behaviors on a Map depending on if the key is already set.
 * -> key: the key to be mapped
 * -> ifPresent: function of form '(value) => {}' to be called if the key is already set,
      the output of which will be the new mapping of the key.
 * -> ifNotPresent: function of form '() => {}' to be called if the key is not already set,
      the output of which will be the new mapping of the key.
 */
Map.prototype.setIfPresent = function(key, ifPresent, ifNotPresent) {
  if (this.has(key)) {
    console.log("present: " + this.get(key));
    this.set(key, ifPresent(this.get(key)));
  } else {
    this.set(key, ifNotPresent());
  }
}