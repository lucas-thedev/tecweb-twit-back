const userRepository = require('../repository/UserRepository');

module.exports = {
  index(req, res) {
    let id = req.params.id
    userRepository.index(id)
    .then((response) =>{
      return res.json(response);
    })
  },

  store(req, res) {    
    let body = req.body 
    let date = new Date();
    body.created_at = date.toISOString().slice(0, 19).replace('T', ' ');
    body.birthday = date.toISOString().slice(0, 19).replace('T', ' ');
    body = Object.values(body)
    userRepository.store(body)
    .then((response) => {
      return res.json(response);
    })
    .catch((message) => {
      res.status(400)
      return res.json({status: 400, error: message})
    })
  }
};