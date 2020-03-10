require('module-alias/register')
const jwt = require('jsonwebtoken');
const db = require('@root/server/config/db.config.js');
const config = require('@root/server/config/config.js');
const Role = db.role;
const User = db.user;
 
verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];
  
  if (!token){
    return res.status(403).json({
        auth: false, 
        message: 'No token provided.'
    })
  }
 
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err){
      return res.status(500).json({
          auth: false, 
          message: 'Fail to Authentication. Error : ' + err
      })
    }

    req.userId = decoded.id;
    next();
  });
}
 
isAdmin = (req, res, next) => {
  User.findById(req.userId)
    .then(user => {
      user.getRoles().then(roles => {
        for(let i=0; i<roles.length; i++){
          console.log(roles[i].name);
          if(roles[i].name.toUpperCase() === "ADMIN"){
            next();
            return;
          }
        }

        res.status(403).json({ message: 'Require Admin Role.' })
        return;
      })
    })
}
 
isPmOrAdmin = (req, res, next) => {
  
  User.findById(req.userId)
    .then(user => {
      user.getRoles().then(roles => {
        for(let i=0; i<roles.length; i++){          
          if(roles[i].name.toUpperCase() === "PM"){
            next();
            return;
          }
          
          if(roles[i].name.toUpperCase() === "ADMIN"){
            next();
            return;
          }
        }
        
        res.status(403).json({ message: 'Require PM or Admin Roles.' })
      })
    })
}
 
const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin = isAdmin;
authJwt.isPmOrAdmin = isPmOrAdmin;
 
module.exports = authJwt;