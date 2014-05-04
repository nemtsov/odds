var odds = require('../lib'),
  Set = odds.Set,
  Cards = odds.util.Cards,
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
      p = new Probability(new Set(1, 2, 3, 4, 5));
      p.of(new Set(3, 4, 5), new Set(2, 3, 4))
        .should.approximately(2 / 3, 1e-9);
    });

    it('should follow known formula', function () {
      var a, b;
      p = new Probability(new Set(1, 2, 3, 4, 5));
      a = new Set(1, 2);
      b = new Set(2, 3, 4);

      p.of(a, b).should.equal(
        p.of(a.intersect(b)) / p.of(b)
      );
    });

    it('should follow Bayes rule', function () {
      var a, b;

      p = new Probability(new Set(1, 2, 3, 4, 5));
      a = new Set(1, 2);
      b = new Set(2, 3, 4);

      p.of(a, b).should.equal(
        p.of(b, a) * p.of(a) / p.of(b)
      );
    });
  });

  describe('independence', function () {
    it('should be true for 3 H/T flip', function () {
      var a, b;

      p = new Probability(
        new Set('HHH', 'HHT', 'HTH', 'HTT',
                'THH', 'THT', 'TTH', 'TTT')
      );

      a = new Set('HHH', 'HTH', 'THH', 'TTH');
      b = new Set('HHH', 'HHT', 'THH', 'THT');

      p.of(a.intersect(b))
        .should.equal(p.of(a) * p.of(b));
    });

    it('should be true for cards (2 ind trials)', function () {
      var deck, jacks, eights;

      deck = Cards.deck();

      jacks = deck.filter(function (c) {
        return c.indexOf('J') === 0;
      });

      eights = deck.filter(function (c) {
        return c.indexOf('8') === 0;
      });

      p = new Probability(deck);

      (p.of(jacks) * p.of(eights))
        .should.approximately((4 / 52) * (4 / 52), 1e-9);
    });
  });
});
