var Set = require('../lib/set');

describe('Set', function () {
  var a, b, c;

  beforeEach(function () {
    a = b = c = null;
  });

  describe('isSubsetOf', function () {
    it('should be ok if for every x in a it is also in b', function () {
      a = new Set(1, 2, 3),
      b = new Set(1, 2, 3);
      a.isSubsetOf(b).should.be.ok;
    });

    it('should be ok if there exists a y that is only in b', function () {
      a = new Set(1, 2),
      b = new Set(1, 2, 3);
      a.isSubsetOf(b).should.be.ok;
    });

    it('should not be ok if x in a is not in b', function () {
      s1 = new Set(5),
      s2 = new Set(1, 2);
      s1.isSubsetOf(s2).should.not.be.ok;
    });

    it('should be ok if both empty', function () {
      s1 = new Set(),
      s2 = new Set();
      s1.isSubsetOf(s2).should.be.ok;
    });
  });

  describe('isProperSubsetOf', function () {
    it('should not be ok if for every x in a exists an x in b', function () {
      a = new Set(1, 2, 3),
      b = new Set(1, 2, 3);
      a.isProperSubsetOf(b).should.not.be.ok;
    });

    it('should be ok if there exists a y that is in b and not in a', function () {
      a = new Set(2, 3),
      b = new Set(1, 2, 3);
      a.isProperSubsetOf(b).should.be.ok;
    });
  });

  describe('equals', function () {
    it('should be ok if a is a subset of b and b is a subset of a', function () {
      a = new Set(1, 2),
      b = new Set(1, 2);
      a.equals(b).should.be.ok;
    });

    it('should not be ok if a is a subset of b and b is not a subset of a', function () {
      a = new Set(1, 2),
      b = new Set(1, 2, 3);
      a.equals(b).should.not.be.ok;
    });

    it('should not be ok if a is not a subset of b and b is a subset of a', function () {
      a = new Set(1, 2, 3),
      b = new Set(1, 2);
      a.equals(b).should.not.be.ok;
    });
  });

  describe('complementOf', function () {
    it('should return every x in b that is not in a', function () {
      a = new Set(1, 2),
      b = new Set(1, 2, 3, 4);
      a.complementOf(b).should.eql([3, 4]);
    });

    it('should return an empty set when complementing self', function () {
      a = new Set(1, 2),
      a.complementOf(a).should.eql([]);
    });
  });

  describe('intersect', function () {
    it('should get all x in S where x is in a and x is in b', function () {
      a = new Set(1, 2, 3),
      b = new Set(2, 3, 4);
      a.intersect(b).should.eql([2, 3]);
    });
  });

  describe('union', function () {
    it('should get all x in S where x is in a or x is in b', function () {
      a = new Set(1, 2, 3),
      b = new Set(2, 3, 4);
      a.union(b).should.eql([1, 2, 3, 4]);
    });
  });

  describe('difference', function () {
    it('should return all x in a that are not in b', function () {
      a = new Set(1, 2, 3),
      b = new Set(1, 3);
      a.difference(b).should.eql([2]);
    });

    it('should be the relative complement', function () {
      var s = new Set(1, 2, 3, 4, 5);
      a = new Set(1, 2, 3),
      b = new Set(2, 3, 4);

      a.isSubsetOf(s).should.be.ok;
      b.isSubsetOf(s).should.be.ok;

      a.difference(b).equals(
        a.intersect(b.complementOf(s))
      ).should.be.ok;
    });
  });

  describe('identities', function () {
    it('should follow the distribute law for unions', function () {
      // A u (B i C) = (A u B) i (A u C)
      a = new Set(1, 2, 3);
      b = new Set(3, 4, 5);
      c = new Set(5, 6, 7);

      a.union(b.intersect(c)).equals(
        a.union(b).intersect(a.union(c))
      ).should.be.ok;
    });

    it('should follow the distributive law for intersection', function () {
      // A u (B i C) = (A u B) i (A u C)
      a = new Set(1, 2, 3);
      b = new Set(3, 4, 5);
      c = new Set(5, 6, 7);

      a.intersect(b.union(c)).equals(
        a.intersect(b).union(a.intersect(c))
      ).should.be.ok;
    });

    describe('De Morgan\'s laws', function () {
      it('should work for complement of an intersection', function () {
        a = new Set(1, 2, 3);
        b = new Set(3, 4, 5);
        c = new Set(1, 2, 3, 4, 5);

        a.intersect(b).complementOf(c).equals(
          a.complementOf(c).union(b.complementOf(c))
        ).should.be.ok;
      });

      it('should work for complement of a union', function () {
        a = new Set(1, 2, 3);
        b = new Set(3, 4, 5);
        c = new Set(1, 2, 3, 4, 5);

        a.union(b).complementOf(c).equals(
          a.complementOf(c).intersect(b.complementOf(c))
        ).should.be.ok;
      });
    });
  });
});
