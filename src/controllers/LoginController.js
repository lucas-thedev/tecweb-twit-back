const loginRepository = require('../repository/LoginRepository');

module.exports = {
  login (req, res) {
    let body = req.body
    loginRepository.login(body)
    .then((response) =>{
      res.status(response.status);
      return res.json(
        {status: response.status, data: response.res}
      );
    })
  }
}
