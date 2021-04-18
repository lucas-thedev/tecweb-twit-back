const sql = require('../database/queries');

let userRepository = {
  index() {
    return new Promise((resolve, reject) => {

        let queryCommand = 'SELECT * FROM user;'

        sql.query(queryCommand).then((res) => {
          resolve(res);
        });
    })
  },
}

module.exports = userRepository;

