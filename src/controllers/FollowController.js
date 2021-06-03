const followRepository = require('../repository/FollowRepository');
const userRepository = require('../repository/UserRepository');

module.exports = {
  store (req, res) {
    const id_user = req.params.idUser
    const id_following = req.params.idFollowing

    followRepository.store(id_user, id_following)
    .then((response) => {
      res.status(200);
      return res.json(
        {status: 200, data: response.res}
      );
    })
    .catch(err => {
      res.status(400)
      return res.json(err.error)
    })
  },

  get (req, res) {
    const id_user = req.params.idUser
    
    followRepository.get(id_user)
    .then((response) => {
      res.status(200);
      return res.json(
        {status: 200, data: response.res}
      );
    })
    .catch(err => {
      res.status(400)
      return res.json(err.error)
    })
  },

  delete (req, res) {
    const id_user = req.params.idUser
    const id_following = req.params.idFollowing
    
    followRepository.delete(id_user, id_following)
    .then((response) => {
      res.status(200);
      return res.json(
        {status: 200, data: response.res}
      );
    })
    .catch(err => {
      res.status(400)
      return res.json(err.error)
    })
  }
}
