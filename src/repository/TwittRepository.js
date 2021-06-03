const sql = require('../database/queries');

let twittRepository = {
  index() {
    return new Promise((resolve, reject) => {

        let queryCommand = sql.all('twiit');

        sql.query(queryCommand).then((res) => {

          if (res && res.length > 0){
            res.forEach((twit, index) => {
  
              queryCommand = sql.index('perfil_user', twit.id_user)
  
              sql.query(queryCommand).then((user) => {
                res[index].username = user[0].username
                if (index + 1 === res.length) {
                  resolve({ data: res, idUser: twit.id_user })
                }
              }) 
            })
          }
        })
        .catch(err => {
          reject({status: 500, error: err})
        })
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

        let queryCommand = sql.store('twiit', ['id_user', 'username', 'created_at', 'count_likes', 'count_retwiit', 'content', 'is_comment', 'updated_at'], body);

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

  getTwiitByID(idTwiit) {
    return new Promise((resolve, reject) => {

      let queryCommand = sql.getByField('twiit', 'id_twiit', idTwiit);

        sql.query(queryCommand).then((res) => {
          resolve(res);
        }).catch(err => {
          console.log(err)
          reject(err)
          return err
        });
    })
  },
}

module.exports = twittRepository;

