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

      let date = new Date();
      const created = date.toISOString().slice(0, 19).replace('T', ' ');
      let queryCommand = sql.store('following', ['id_user',' id_following', 'created_at', 'updated_at'], [idUser, idFollowing, created, created]);

      sql.query(queryCommand).then((res) => {
        let status = 400
        if (res.length) {
            status = 200
        }
        resolve({status, res}); 
      })
      .catch(error => {
        reject({status: 500, error})
      })
    })
  },
}

module.exports = followRepository;

