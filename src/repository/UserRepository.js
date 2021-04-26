const sql = require('../database/queries');

let userRepository = {
  index() {
    return new Promise((resolve, reject) => {

        let queryCommand = sql.index('perfil_user');

        sql.query(queryCommand).then((res) => {
          resolve(res);
        });
    })
  },

  store() {
    return new Promise((resolve, reject) => {

        let queryCommand = sql.store('perfil_user', ['username', 'created_at', 'biograph', 'birthday', 'perfil_pic', 'password', 'email', 'name'], ['teste', '2020-12-12', 'oi esta eh uma bio', '1997-08-08', '/assets/pic', '123456', 'user@user.com', 'juliette']);

        sql.query(queryCommand).then((res) => {
          resolve(res);
        });
    })
  },
}

module.exports = userRepository;

