const twittRepository = require('../repository/TwittRepository');
const followRepository = require('../repository/FollowRepository');
const retwiitRepository = require('../repository/RetwiitRepository');
const userRepository = require('../repository/userRepository');

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
        // Get user normal twiits
        if (followers.res.length) {
          followers.res.forEach(follower => {
            twittRepository.get(follower.id_following)
            .then(followerTwiits => {
              twiits.push(...followerTwiits)
            })
          })

          // Get user retwiits
          retwiitRepository.get(id).then(retwiits => {
            if (retwiits.length) {
              retwiits.forEach(retwiit => {
                // Get twiit by retwiits id
                twittRepository.getTwiitByID(retwiit.id_twiit)
                .then(retwiitsTwiits => {
                  retwiitsTwiits[0].created_at = retwiit.created_at
                  console.log(retwiit)
                  // Get user who retwiit
                    userRepository.index(retwiit.id_user).then(retwiitUserData => {
                      console.log('retwiitUserData[0]: ', retwiitUserData[0])
                      retwiitsTwiits[0].username = retwiitUserData[0].username
                      userRepository.index(retwiitsTwiits[0].id_user).then(retwiitUserFromData => {
                        retwiitsTwiits[0].retwiitedFrom = retwiitUserFromData[0].username
                        
                        twiits.push(...retwiitsTwiits)
                        // Get user normal twiits
                        twittRepository.get(id)
                        .then(userTwiits => {
                          twiits.push(...userTwiits)
                          twiits.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                          return res.json({ data: twiits })
                        })
                      })
                    })
                })
              })
            } else {
               // Get user normal twiits
               twittRepository.get(id)
               .then(userTwiits => {
                 twiits.push(...userTwiits)
                 twiits.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                 return res.json({ data: twiits })
               })
            }
          })
        } else {
          // Get user retwiits
          retwiitRepository.get(id).then(retwiits => {
            if (retwiits.length) {
              retwiits.forEach(retwiit => {
                // Get twiit by retwiits id
                twittRepository.getTwiitByID(retwiit.id_twiit)
                .then(retwiitsTwiits => {
                  retwiitsTwiits[0].created_at = retwiit.created_at
                  console.log(retwiit)
                  // Get user who retwiit
                    userRepository.index(retwiit.id_user).then(retwiitUserData => {
                      console.log('retwiitUserData[0]: ', retwiitUserData[0])
                      retwiitsTwiits[0].username = retwiitUserData[0].username
                      userRepository.index(retwiitsTwiits[0].id_user).then(retwiitUserFromData => {
                        retwiitsTwiits[0].retwiitedFrom = retwiitUserFromData[0].username
                        
                        twiits.push(...retwiitsTwiits)
                        // Get user normal twiits
                        twittRepository.get(id)
                        .then(userTwiits => {
                          twiits.push(...userTwiits)
                          twiits.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                          return res.json({ data: twiits })
                        })
                      })
                    })
                })
              })
            } else {
              // User twiits
              twittRepository.get(id)
                .then(userTwiits => {
                  twiits.push(...userTwiits)
                  twiits.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                  return res.json({ data: twiits })
                })
            }
          })
        }
      })
  }
};