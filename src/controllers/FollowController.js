const followRepository = require('../repository/FollowRepository');

module.exports = {
  store (req, res) {
    const id_user = req.params.idUser
    const id_following = req.params.idFollowing

    followRepository.get(id_user)
    .then(res => {
      if (!res.res.length) {
        followRepository.store(id_user, id_following)
        .then((response) => {
          res.status(response.status);
          return res.json(
            {status: response.status, data: response.res}
          );
        })
        .catch(err => {
          console.log(err)
          return res.json(
            {status: 400, error: "Erro ao seguir o usuário de id: " + id_following }
          );
        })
      } else {
        return res.json(
          {status: 400, error: "Este usuário já se encontra na lista de seguidores"}
        );
      }
    })
    .catch(err => {
      console.log(err)
      return res.json(
        {status: 400, error: "Erro ao buscar o usuário de id: " + id_user }
      );
    })

    
  }
}
