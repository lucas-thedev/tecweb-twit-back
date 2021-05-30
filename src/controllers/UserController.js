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
    body.birthday = body.birthday ? new Date(body.birthday).toISOString().slice(0, 19).replace('T', ' '): body.created_at;
    body = Object.values(body)
    userRepository.store(body)
    .then((response) => {
      return res.json(response);
    })
    .catch((message) => {
      console.log('no catch: ', message)
      res.status(400)
      return res.json(message)
    })
  }
};