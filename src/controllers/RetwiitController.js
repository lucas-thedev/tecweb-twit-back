const retwiitRepository = require('../repository/retwiitRepository');

module.exports = {
  store (req, res) {
    const id_user = req.body.idUser
    const id_parent_user = req.body.idTwiitUser
    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const id_twiit = req.body.idTwiit

    retwiitRepository.store([id_parent_user, id_user, created_at, updated_at, id_twiit])
    .then((response) => {
      res.status(200);
      return res.json(
        {status: 200, data: response}
      );
    })
    .catch(err => {
      res.status(400)
      return res.json(err.error)
    })
  }
}
