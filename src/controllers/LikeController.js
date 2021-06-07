const likeRepository = require('../repository/LikeRepository');

module.exports = {
  store(req, res) {    
    const id_user = req.params.idUser
    const id_twiit = req.params.idPost

    likeRepository.store(id_user, id_twiit)
    .then((response) => {
      return res.json(response);
    })
    .catch((message) => {
      console.log(message)
      res.status(400)
      return res.json(message)
    })
  },
  get (req, res){
    const id = req.params.idPost
    likeRepository.get(id)
    .then((response) => {
      return res.json(response);
    })
    .catch((message) => {
      console.log(message)
      res.status(400)
      return res.json(message)
    })
  },

  jao (req, res){
    const id = req.params.idPost
    const idUser = req.params.idUser
    likeRepository.jao(id,idUser)
    .then((response) => {
      return res.json(response);
    })
    .catch((message) => {
      console.log(message)
      res.status(400)
      return res.json(message)
    })
  }
};