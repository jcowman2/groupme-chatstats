Array.prototype.toProperty = function(prop) {
  return this.map(entry => entry[prop]);
}