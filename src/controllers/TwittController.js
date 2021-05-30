const twittRepository = require('../repository/TwittRepository');

module.exports = {
  index(req, res) {
    twittRepository.index()
      .then((response) => {
        return res.json(response)
      })
  },

  get(req, res) {
    let id = req.params.id
    twittRepository.get(id)
      .then((response) => {
        return res.json(response)
      })
  },

  store(req, res) {
    let body = Object.values(req.body)

    twittRepository.store(body)
      .then((response) => {
        return res.json(response)
      })
  },

  show(req, res) {
    twittRepository.getAll()
      .then((response) => {
        return res.json(response)
      })
  }
};