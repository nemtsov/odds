var assert = require('assert');

exports.Cards = require('./cards');

exports.range = function (start, end) {
  var set, i;
  assert(start <= end);

  set = new Set();
  for (i = start; i < end; i++) {
    set.push(i);
  }

  return set;
};
