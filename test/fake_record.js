var faker = require('faker');
// fake record
module.exports = function() {
  return record = {
    type: 'tweet',
    index: 'twitter',
    id: Math.floor(Math.random() * (1000000000000)),
    message: faker.hacker.phrase()
  }
}
