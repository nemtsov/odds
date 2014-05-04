module.exports = Set;

function Set() {
  var set = [];
  set.push.apply(set, arguments);
  set.__proto__ = Set.prototype;
  return set;
}

Set.create = function (arr) {
  if (arr instanceof Set) return arr;
  if (Array.isArray(arr)) {
    arr.__proto__ = Set.prototype;
    return arr;
  }
  return Set.apply(Object.create(Set.prototype), arguments);
};

Set.prototype = Object.create(Array.prototype);

// RELATIONS

Set.prototype.isSubsetOf = function (set) {
  return this.every(function (el) {
    return set.indexOf(el) > -1;
  });
};

Set.prototype.isProperSubsetOf = function (set) {
  if (this.length >= set.length) return false;
  return this.isSubsetOf(set);
};

Set.prototype.equals = function (set) {
  return this.isSubsetOf(set) &&
    set.isSubsetOf(this);
};

Set.prototype.complementOf = function (set) {
  var self = this;
  return set.filter(function (el) {
    return self.indexOf(el) === -1;
  });
};

// OPERATIONS

Set.prototype.intersect = function (set) {
  return this.filter(function (el) {
    return set.indexOf(el) > -1;
  });
};

Set.prototype.union = function (set) {
  var out = this.concat(set);
  return out.filter(function (el, idx) {
    return out.indexOf(el) === idx;
  });
};

Set.prototype.difference = function (set) {
  return this.filter(function (el) {
    return set.indexOf(el) === -1;
  });
};

// ensure all native Array methods still return a Set
;[
 'concat', 'filter', 'map', 'reduce',
 'reverse', 'slice', 'splice'
].forEach(function (methodName) {
  Set.prototype[methodName] = function () {
    return Set.create(Array.prototype[methodName]
      .apply(this, arguments));
  };
});
