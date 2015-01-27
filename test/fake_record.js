var faker = require('faker');

module.exports = function() { // fake record
  return {
    type: 'tweet',
    index: 'twitter',
    id: Math.floor(Math.random() * (1000000000000)),
    message: faker.hacker.phrase()
  }
}
