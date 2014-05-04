var Set = require('../set');

module.exports = Cards = {};

Cards.suits = function () {
  return new Set('H', 'D', 'C', 'S');
};

Cards.ranks = function () {
  return new Set(
    'A', '2', '3', '4', '5', '6', '7',
    '8', '9', '10', 'J', 'Q', 'K');
};

Cards.deck = function () {
  var suits, ranks, deck;

  suits = Cards.suits();
  ranks = Cards.ranks();
  deck = new Set();

  suits.forEach(function (suit) {
    ranks.forEach(function (rank) {
      deck.push(rank + suit);
    });
  });

  return deck;
};
