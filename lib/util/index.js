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
  var set = [],
    stack = [new Node([], 0)],
    branches,
    p, i, copy;

  while ((p = stack.pop())) {
    branches = new Array(sampleSpaceSize);
    for (i = 0; i < sampleSpaceSize; i++) {
      copy = p.c.slice(0);
      copy.push(i);
      branches[i] = new Node(copy, p.l + 1);
    }

    if (p.l === max - 1) {
      set.push.apply(set, branches.map(getnc));
    } else {
      stack.push.apply(stack, branches);
    }
  }

  return Set.create(set);
};

function Node(c, length) {
  this.c = c;
  this.l = length;
}

function getnc(n) {
  return n.c;
}
