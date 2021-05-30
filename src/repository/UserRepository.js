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
        let createCommand = sql.store('perfil_user', ['username', 'created_at', 'biograph', 'birthday', 'perfil_pic', 'password', 'email', 'name'], body);
        const find = sql.get('perfil_user', body[0])

        const email = body[body.length-2]

        console.log('log1: ', email)
        
        sql.query(find).then((res) => {
          if (!res.length) {
            sql.query(createCommand).then(createRes => {
              resolve(rest)
            })
          } else {
            reject("Teste mensagem")
          }
        });
    })
  },
}

module.exports = userRepository;

