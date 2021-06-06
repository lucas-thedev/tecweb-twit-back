const sql = require('../database/queries');

let likeRepository = {
  
  store(idUser, idTwiit) {
    return new Promise((resolve, reject) => {
      const QUERY_USER_LIKES = sql.getWithCondition('likes', ` id_user = ${idUser} AND id_twiit = ${idTwiit}`)
      
      sql.query(QUERY_USER_LIKES).then((res) => {
        if (res.length) {
          const likeCount = res[0].count_likes

          const newLikeCount = likeCount === 0 ? 0 : likeCount - 1

          sql.query(sql.update('likes', 'count_likes', newLikeCount, ` id_user = ${idUser} AND id_twiit = ${idTwiit}`))
          .then(updatedSingle => {
              sql.query(sql.update('twiit', 'count_likes', newLikeCount, ` id_twiit = ${idTwiit}`))
                .then(res => {
                  resolve(res)
                })
            })
        } else {
          const likeCount = 0

          const newLikeCount = likeCount === 0 ? 0 : likeCount + 1

          sql.query(sql.store('likes', ['id_user', 'id_twiit', 'count_likes'], [idUser, idTwiit, likeCount + 1]))
          .then(updatedSingle => {
            sql.query(sql.update('twiit', 'count_likes', likeCount + 1, ` id_twiit = ${idTwiit}`))
              .then(res => {
                resolve(res)
              })
          })
        }
      })
    })
  }
}
module.exports = likeRepository;

