const sql = require('../database/queries');

let followRepository = {
  get(idUser) {
    return new Promise((resolve, reject) => {

        let queryCommand = sql.index('following', idUser);

        sql.query(queryCommand).then((res) => {
          let status = 400
          if (res.length) {
              status = 200
          }
          resolve({status, res});
        });
    })
  },

  store(idUser, idFollowing) {
    return new Promise((resolve, reject) => {

        let queryCommand = sql.store('following', ['id_user',' id_following'], [idUser, idFollowing]);

        sql.query(queryCommand).then((res) => {
          let status = 400
          if (res.length) {
              status = 200
          }
          resolve({status, res});
        });
    })
  },
}

module.exports = followRepository;

