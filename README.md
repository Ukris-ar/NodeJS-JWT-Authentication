# NodeJS-JWT-Authentication

## Installation

Use the package manager [npm](https://nodejs.org/en/) to install.

```bash
    - cd /example-authentication-jwt
    - npm install
```

## Database

Use the database [mysql](https://www.mysql.com/) to install.

```bash
    - prepare mysql 
    - create database you can check it in ./server/config 
```

You needn’t create table in database because i create schema in this model you can check it in ./server/model

## Usage

```bash
    - cd /example-authentication-jwt/server
    - npx nodemon index.js
    - check it http://localhost:5000
```

## API Example 

### Sign Up
###### URL Route : http://localhost:5000/auth/signup 

---

![alt text](https://i.ibb.co/mcRLV5S/Screen-Shot-2563-03-11-at-17-36-15.png)

###### Example Request
---
```bash
    
    {
       "name" : "John Doe", 
       "username" : "JohnDoe",
       "email" : "johndoe@examplemail.com",
       "roles" : ["user"],
       "password" : "123456789"
    }

```

### Sign In
###### URL Route : http://localhost:5000/auth/signin 

---

![alt text](https://i.ibb.co/hYYpxF7/Screen-Shot-2563-03-11-at-19-15-46.png)

###### Example Request
---
```bash
    
    {
       "username": "JohnDoe",
       "password": "123456789"
    }

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[grokonez](https://grokonez.com/node-js/jwt/nodejs-jwt-authentication-nodejs-express-restapis-json-web-token-bcryptjs-sequelize-mysql)

[MIT](https://choosealicense.com/licenses/mit/)
