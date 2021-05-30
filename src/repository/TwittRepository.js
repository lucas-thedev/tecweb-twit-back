const sql = require('../database/queries');

let twittRepository = {
  index() {
    return new Promise((resolve, reject) => {

        let queryCommand = sql.all('twiit');

        sql.query(queryCommand).then((res) => {

          res.forEach((twit, index) => {

            queryCommand = sql.index('perfil_user', twit.id_user)

            sql.query(queryCommand).then((user) => {
              res[index].username = user[0].username
              if (index + 1 === res.length) {
                resolve(res)
              }

            }) 
          })

        });
    })
  },

  get(id) {
    return new Promise((resolve, reject) => {

      let queryCommand = sql.index('twiit', id);

        sql.query(queryCommand).then((res) => {
          resolve(res);
        });
    })
  },

  store(body) {
    return new Promise((resolve, reject) => {

        let queryCommand = sql.store('twiit', ['id_user', 'created_at', 'count_likes', 'count_retwiit', 'content', 'is_comment', 'updated_at'], body);

        sql.query(queryCommand).then((res) => {
          resolve(res);
        });
    })
  },

  
  getAll() {
    return new Promise((resolve, reject) => {

      let queryCommand = sql.all('perfil_user');

        sql.query(queryCommand).then((res) => {
          resolve(res);
        });
    })
  },
}

module.exports = twittRepository;

