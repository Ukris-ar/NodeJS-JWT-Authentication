require('module-alias/register')
const express = require('express')
const db = require('@root/server/config/db.config.js')
const bodyParser = require('body-parser')
const routes = require('@root/server/router')

const app = express()
const Role = db.role

// force drop database and resync
db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync with { force: true }')
    initial()
})

function initial(){
    Role.create({
        id: 1,
        name: "USER"
    })

    Role.create({
        id: 2,
        name: "ADMIN"
    })

    Role.create({
        id: 3,
        name: "PM"
    })              
}

app.use(bodyParser.json())

//  Connect all our routes to our application
app.use('/', routes)
  
app.listen(5000, function () { 
  console.log('App listening at http://localhost:5000')
})