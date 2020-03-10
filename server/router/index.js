require('module-alias/register')
const routes = require('express').Router()
const isVerifySignUp = require('@root/server/router/verify/signup')
const isAuthJwt = require('@root/server/router/verify/jwt')
const controller = require('@root/server/controllers')
 
routes.get('/', (req, res) => {
    res.send('hello world')
})

routes.post('/api/auth/signup', [isVerifySignUp.checkDuplicateUserNameOrEmail, isVerifySignUp.checkRolesExisted], controller.signup)
routes.post('/api/auth/signin', controller.signin)
routes.get('/api/test/user', [isAuthJwt.verifyToken], controller.userContent)
routes.get('/api/test/pm', [isAuthJwt.verifyToken, isAuthJwt.isPmOrAdmin], controller.managementBoard)
routes.get('/api/test/admin', [isAuthJwt.verifyToken, isAuthJwt.isAdmin], controller.adminBoard)

module.exports = routes