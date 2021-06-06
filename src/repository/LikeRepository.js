const sql = require('../database/queries');

let likeRepository = {
  store(idUser, idTwiit) {
    return new Promise((resolve, reject) => {
      const QUERY_USER_LIKES = sql.getWithCondition('likes', ` id_user = ${idUser} AND id_twiit = ${idTwiit}`)
      
      sql.query(QUERY_USER_LIKES).then((res) => {
        const usuarioJaCurtiuAlgumaVezEsteTwiit = res.length
        if (usuarioJaCurtiuAlgumaVezEsteTwiit) {
          // CASO 1: 
          if (res[0].liked == 1) {
            // pegar registo no likes e mudar pra 0
            const QUERY_ZERAR_LIKED = sql.update('likes', 'liked', 0 , ` id_user = ${idUser} AND id_twiit = ${idTwiit}`)
            this._executarQuery(QUERY_ZERAR_LIKED)
              .then(likedZerado => {
                // diminuir no count_likes ( twiit table ) 1 curtida
                const QUERY_USER_LIKES = sql.getWithCondition('twiit', ` id_twiit = ${idTwiit}`)

                this._executarQuery(QUERY_USER_LIKES)
                  .then(registroLikesTwiit => {
                    const count_likes = registroLikesTwiit[0].count_likes
                    const QUERY_ATUALIZAR_COUNT_LIKES_TWIIT = sql.update('twiit', 'count_likes', count_likes - 1, ` id_twiit = ${idTwiit}`)
                    this._executarQuery(QUERY_ATUALIZAR_COUNT_LIKES_TWIIT)
                      .then(quantidadeDeCurtidasNoTwiitAtualizada => {
                        resolve(quantidadeDeCurtidasNoTwiitAtualizada)
                      })
                      .catch(erroAoAtualizar => {
                        reject(erroAoAtualizar)
                      })
                  })
              })
              .catch(erroAoZerar => {
                reject(erroAoZerar)
              })
          
          } else {
            // CASO 2:
             // pegar registo no likes e mudar pra 1
             const QUERY_ZERAR_LIKED = sql.update('likes', 'liked', 1 , ` id_user = ${idUser} AND id_twiit = ${idTwiit}`)
             this._executarQuery(QUERY_ZERAR_LIKED)
               .then(likedZerado => {
                 // aumentar no count_likes ( twiit table ) 1 curtida
                 const QUERY_USER_LIKES = sql.getWithCondition('twiit', ` AND id_twiit = ${idTwiit}`)
 
                 this._executarQuery(QUERY_USER_LIKES)
                   .then(registroLikesTwiit => {
                     const count_likes = registroLikesTwiit[0].count_likes
                     const QUERY_ATUALIZAR_COUNT_LIKES_TWIIT = sql.update('twiit', 'count_likes', count_likes + 1, ` id_twiit = ${idTwiit}`)
                     this._executarQuery(QUERY_ATUALIZAR_COUNT_LIKES_TWIIT)
                       .then(quantidadeDeCurtidasNoTwiitAtualizada => {
                         resolve(quantidadeDeCurtidasNoTwiitAtualizada)
                       })
                       .catch(erroAoAtualizar => {
                         reject(erroAoAtualizar)
                       })
                   })
               })
               .catch(erroAoZerar => {
                 reject(erroAoZerar)
               })
          }
          resolve()
        } else {
          const QUERY_CRIAR_REGISTRO = sql.store('likes', ['id_user', 'id_twiit', 'liked'], [idUser, idTwiit, 1])

          this._executarQuery(QUERY_CRIAR_REGISTRO)
            .then(registroCriado => {
              const QUERY_USER_LIKES = sql.getWithCondition('twiit', ` id_twiit = ${idTwiit}`)

              this._executarQuery(QUERY_USER_LIKES)
                .then(registroLikesTwiit => {
                  const count_likes = registroLikesTwiit[0].count_likes
                  const QUERY_ATUALIZAR_COUNT_LIKES_TWIIT = sql.update('twiit', 'count_likes', count_likes + 1, ` id_user = ${idUser} AND id_twiit = ${idTwiit}`)
                  this._executarQuery(QUERY_ATUALIZAR_COUNT_LIKES_TWIIT)
                    .then(quantidadeDeCurtidasNoTwiitAtualizada => {
                      resolve(quantidadeDeCurtidasNoTwiitAtualizada)
                    })
                    .catch(erroAoAtualizar => {
                      reject(erroAoAtualizar)
                    })
                })
            })
            .catch(erroAoCriarRegistro => {
              reject(erroAoCriarRegistro)
            })

        }
      })
    })
  },



  // Low level
  _executarQuery(query) {
    return sql.query(query)
  }
  
}
module.exports = likeRepository;

