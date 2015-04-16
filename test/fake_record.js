module.exports = function() { // fake record
  return {
    index: 'twitter',
    type: 'tweet',
    id: Math.floor(Math.random() * (1000000000000)),
    message: 'My Random Message'
  }
}
