const express = require('express');

const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const TwittController = require('./controllers/TwittController');
const FollowController = require('./controllers/FollowController');
const RetwiitController = require('./controllers/RetwiitController');
const LikeController = require('./controllers/LikeController');

const routes = express.Router();

routes.get('/users/:id', UserController.index);
routes.get('/users/username/:username', UserController.get);
routes.post('/users', UserController.store);
routes.post('/login', LoginController.login);
routes.get('/twit/:id', TwittController.get);
routes.get('/twit/with-followers/:id', TwittController.getWithFollowers);
routes.post('/twit/:user', TwittController.store);
routes.post('/follow/:idUser/:idFollowing', FollowController.store);
routes.get('/follow/:idUser/:idFollowing', FollowController.delete);
routes.get('/follow/:idUser', FollowController.get);
routes.post('/retwiit', RetwiitController.store);
routes.post('/like/:idUser/:idPost', LikeController.store);

module.exports = routes;