const express = require('express');

const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const TwittController = require('./controllers/TwittController');
const FollowController = require('./controllers/FollowController');

const routes = express.Router();

routes.get('/users/:id', UserController.index);
routes.get('/users', TwittController.show);
routes.post('/users', UserController.store);
routes.post('/login', LoginController.login);
routes.get('/twit/:id', TwittController.get);
routes.get('/twit', TwittController.index);
routes.post('/twit/:user', TwittController.store);
routes.post('/follow/:idUser/:idFollowing', FollowController.store);

module.exports = routes;