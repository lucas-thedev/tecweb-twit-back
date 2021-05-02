const sql = require('../database/queries');

let loginRepository = {
  login(body) {
    return new Promise((resolve, reject) => {

        let queryCommand = sql.get('perfil_user', body.username);

        sql.query(queryCommand).then((res) => {

          let status = 401
          if (res.length) {
            if (res[0].username === body.username && res[0].password === body.password ) {
              status = 200
            }
          }
          resolve({status, res});
        });
    })
  },
}

module.exports = loginRepository;

