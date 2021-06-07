const sql = require('../database/queries');

let likeRepository = {
  store(idUser, idTwiit) {
    return new Promise((resolve, reject) => {
      const QUERY_USER_LIKES = sql.getWithCondition('likes', ` id_user = ${idUser} AND id_twiit = ${idTwiit}`)
      
      sql.query(QUERY_USER_LIKES).then((res) => {
        if (res.length) {
          const liked = res[0].liked

          const newLikeCount = liked === 0 ? 1 : 0

          sql.query(sql.update('likes', 'liked', newLikeCount, ` id_user = ${idUser} AND id_twiit = ${idTwiit}`))
          .then(updatedSingle => {
            resolve(res)
            })
        } else {
          const likeCount = 1

          sql.query(sql.store('likes', ['id_user', 'id_twiit', 'liked'], [idUser, idTwiit, likeCount]))
          .then(updatedSingle => {
            resolve(res)
          })
        }
      })
    })
  },

  get (post){
    return new Promise((resolve,reject) => {
      const QUERY_COUNT = sql.getWithConditionCount('likes', `liked = 1 AND id_twiit = ${post}`)
      sql.query(QUERY_COUNT).then((res) => {
        resolve(res)
      })
    })
  },

  jao (post,user){
    return new Promise((resolve,reject) => {
      console.log(post)
      console.log(user)
      const QUERY_COUNT = sql.getWithCondition('likes', ` id_user = ${user} AND id_twiit = ${post}`)
      sql.query(QUERY_COUNT).then((res) => {
        console.log(res)
        resolve(res)
      })
    })
  }
  
}
module.exports = likeRepository;

