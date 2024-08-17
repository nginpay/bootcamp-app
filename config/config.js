// require('dotenv').config()
// module.exports = {    
//         username: process.env.DB_USER,
//         password:  process.env.DB_PASS,
//         database:  process.env.DB_NAME,
//         host:  process.env.DB_HOST,
//         port:  process.env.DB_PORT,
//         dialect:  process.env.DB_DLCT,
//         logging: true
// };

module.exports = {    
         dialect: 'sqlite',
         storage: './db/bootcamp.sqlite'
};

