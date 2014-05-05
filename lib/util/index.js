var assert = require('assert'),
  Set = require('../set');

exports.Cards = require('./cards');
exports.Dice = require('./dice');

exports.range = function (start, end) {
  var set, i;
  assert(start <= end);

  set = new Set();
  for (i = start; i < end; i++) {
    set.push(i);
  }

  return set;
};

exports.permutations = function (sampleSpaceSize, max) {
  var set = new Set(),
    stack = [new Node([], 0)],
    branches,
    p, i, copy;

  do {
    p = stack.pop();
    if ('undefined' === typeof p) break;

    branches = [];
    for (i = 0; i < sampleSpaceSize; i++) {
      copy = p.c.slice(0);
      copy.push(i);
      branches[i] = new Node(copy, p.l + 1);
    }

    if (branches[0].l >= max) {
      set.push.apply(set, branches.map(getnc));
    } else {
      stack.push.apply(stack, branches);
    }
  } while (true);

  function getnc(n) {
    return n.c;
  }

  return set;
};

function Node(c, length) {
  this.c = c;
  this.l = length;
}
