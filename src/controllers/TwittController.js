const twittRepository = require('../repository/TwittRepository');
const followRepository = require('../repository/FollowRepository');

module.exports = {
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
  },

  getWithFollowers(req, res) {
    const id = req.params.id

    const twiits = []

    followRepository.get(id)
      .then((followers) => {
        if (followers.res.length) {
          followers.res.forEach(follower => {
            twittRepository.get(follower.id_following)
            .then(followerTwiits => {
              twiits.push(...followerTwiits)
            })
          })

          twittRepository.get(id)
          .then(userTwiits => {
            twiits.push(...userTwiits)
            twiits.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            return res.json({ data: twiits })
          })
        } else {
          twittRepository.get(id)
          .then(userTwiits => {
            twiits.concat(userTwiits)
            return res.json({ data: twiits })
          })
        }
      })
  }
};