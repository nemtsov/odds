var util = require('../../lib/util');

describe('Util', function () {
  it('should get permutations', function () {
    var exp = util.permutations(10, 2);
    exp.length.should.equal(Math.pow(10, 2));
  });

  it('should get range', function () {
    var rng = util.range(1, 5);
    rng.should.eql([1, 2, 3, 4]);
  });
});
