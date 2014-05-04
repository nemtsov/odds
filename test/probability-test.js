var odds = require('../lib'),
  Set = odds.Set,
  Probability = odds.Probability;

describe('Probability', function () {
  var p;

  beforeEach(function () {
    p = null;
  })

  it('should be occurrences(e) / sampleSize', function () {
    p = new Probability(new Set(1, 2, 3, 4, 5, 3));
    p.of(3).should.equal(2 / 6);
  });

  it('should be occurrences(A) / sampleSize', function () {
    p = new Probability(new Set(1, 2, 3, 4, 5, 3));
    p.of(new Set(2, 3)).should.equal(3 / 6);
  });

  describe('conditional', function () {
    it('should get prob of ev given set', function () {
      p = new Probability(new Set(1, 2, 3));
      p.of(2, new Set(2, 3))
        .should.equal(1 / 2);
    });

    it('should get prob of set given set', function () {
      p = new Probability(new Set(1, 2, 3, 4));
      p.of(new Set(2, 3), new Set(2, 3, 4))
        .should.equal(2 / 3);
    });
  });
});
