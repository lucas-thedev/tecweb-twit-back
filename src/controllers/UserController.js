const userRepository = require('../repository/UserRepository');

module.exports = {
  index(req, res) {
    userRepository.index()
    .then((response) =>{
      return res.json(response);
    })
  },

  async store(req, res) {
    userRepository.store()
    .then((response) =>{
      return res.json(response);
    })
  }
};