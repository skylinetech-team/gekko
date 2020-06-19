'use strict';

const Router = require('koa-router');
const userContraller = require('./controllers/user');


const router = new Router();
router.get('/api/user/getUser', userContraller.getUser);
router.post('/api/user/signup', userContraller.signup);
router.post('/api/user/updatePassword', userContraller.updatePassword);
router.post('/api/user/sendVerifyEmail', userContraller.sendVerifyEmail);
router.post('/api/user/addUser', userContraller.addUser);

module.exports = router;