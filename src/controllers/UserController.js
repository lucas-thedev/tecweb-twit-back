const userRepository = require('../repository/UserRepository');

module.exports = {
  index(req, res) {
    userRepository.index()
    .then((res) =>{
      return res.json(users);
    })
  },

  async store(req, res) {
    return res.json(user);
  }
};