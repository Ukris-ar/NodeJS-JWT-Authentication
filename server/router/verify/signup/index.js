require('module-alias/register')
const db = require('@root/server/config/db.config.js')
const config = require('@root/server/config/config.js')
const ROLEs = config.ROLEs
const User = db.user
const Role = db.role
 
checkDuplicateUserNameOrEmail = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username
    } 
  }).then(user => {
    if(user){
      res.status(400).json({ message: 'Username is already taken.' })
      return
    }
    
    User.findOne({ 
      where: {
        email: req.body.email
      } 
    }).then(user => {
      if(user){
        res.status(400).json({ message: 'Email is already in use' })
        return
      }
        
      next()
    })
  })
}
 
checkRolesExisted = (req, res, next) => {  
  for(let i=0; i<req.body.roles.length; i++){
    if(!ROLEs.includes(req.body.roles[i].toUpperCase())){
      res.status(400).json({ message: 'Does not exist role.' + req.body.role[i] })
      return
    }
  }
  next()
}
 
const signUpVerify = {}
signUpVerify.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail
signUpVerify.checkRolesExisted = checkRolesExisted
 
module.exports = signUpVerify