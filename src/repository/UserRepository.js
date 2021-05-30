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

  get(username) {
    return new Promise((resolve, reject) => {

        let queryCommand = sql.get('perfil_user', username)

        sql.query(queryCommand).then((res) => {
          resolve(res);
        });
    })
  },

  store(body) {
    return new Promise((resolve, reject) => {
        let createCommand = sql.store('perfil_user', ['username', 'created_at', 'biograph', 'birthday', 'perfil_pic', 'password', 'email', 'name'], body);
        const email = body[body.length-2]
        
        const findByUsername = sql.getByField('perfil_user', 'username', body[0])
        const findByEmail = sql.getByField('perfil_user', 'email', email)

        sql.query(findByUsername).then((res) => {
          if (!res.length) {
            sql.query(findByEmail).then(resEmail => {
              if (!resEmail.length) {
                sql.query(createCommand).then(createRes => {
                  resolve(createRes)
                })
              } else {
                reject("Este email já está sendo utilizado por outro usuário.")
              }
            })
          } else {
            reject("Este login de usuário já está sendo utilizado por outra pessoa.")
          }
        });
    })
  },
}

module.exports = userRepository;

