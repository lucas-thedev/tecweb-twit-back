const sql = require('../database/queries');

let retwiitRepository = {
  store(body) {
    return new Promise((resolve, reject) => {
      let queryCommand = sql.store('retwiit', ['id_parent_user', 'id_user', 'created_at', 'updated_at', 'id_twiit'], body);

      sql.query(queryCommand).then((res) => {
        resolve(res);
      }).catch(err => {
        reject(err)
      })
    })
  },

  get(id) {
    return new Promise((resolve, reject) => {

      let queryCommand = sql.index('retwiit', id);

        sql.query(queryCommand).then((res) => {
          resolve(res);
        })
        .catch(err => {
          reject(err)
        })
    })
  },
}

module.exports = retwiitRepository;

