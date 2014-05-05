var Set = require('../set');

module.exports = Dice = {};

Dice.die = function () {
  return new Set('H', 'T');
};
