var assert = require('assert'),
  Set = require('./set');

module.exports = Probability;

function Probability(sampleSpace) {
  this.space = sampleSpace;
}

Probability.prototype.of = function (eventOrSet, condition) {
  var isSet = eventOrSet instanceof Set,
    hasCond = condition instanceof Set;
  return isSet ?
    hasCond ?
      this._ofSetGiven(eventOrSet, condition) :
      this._ofSet(eventOrSet) :
    hasCond ?
      this._ofEventGiven(eventOrSet, condition) :
      this._ofEvent(eventOrSet);
};

Probability.prototype._ofEvent = function (element) {
  assert(this.space.hasElement(element), 'not in space');
  var occurs = countOccurrences(element, this.space);
  return occurs / this.space.length;
};

Probability.prototype._ofSet = function (set) {
  assert(set.isSubsetOf(this.space), 'not a subset');
  var intersection = this.space.intersect(set);
  return intersection.length / this.space.length;
};

Probability.prototype._ofEventGiven = function (element, condition) {
  return this._ofEvent(element) / this._ofSet(condition);
};

Probability.prototype._ofSetGiven = function (set, condition) {
  var intersection = condition.intersect(set);
  return this._ofSet(intersection) / this._ofSet(condition);
};

function countOccurrences(needle, haystack) {
  return haystack.reduce(function (prev, curr) {
    return prev + (needle === curr ? 1 : 0);
  }, 0);
}
