const sql = require('../database/queries');

let userRepository = {
  index(id) {
    return new Promise((resolve, reject) => {

        let queryCommand = sql.index('perfil_user', id);

        sql.query(queryCommand).then((res) => {
          resolve(res);
        });
    })
  },

  store(body) {
    return new Promise((resolve, reject) => {

        let queryCommand = sql.store('perfil_user', ['username', 'created_at', 'biograph', 'birthday', 'perfil_pic', 'password', 'email', 'name'], body);

        sql.query(queryCommand).then((res) => {
          resolve(res);
        });
    })
  },
}

module.exports = userRepository;

