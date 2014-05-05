var util = require('../../lib/util');

describe('Util', function () {
  it('should get permutations', function () {
    var base = 3, exp = 3,
      perms = util.permutations(base, exp);
    perms.length.should.equal(Math.pow(base, exp));
  });

  it('should get range', function () {
    var rng = util.range(1, 5);
    rng.should.eql([1, 2, 3, 4]);
  });
});
