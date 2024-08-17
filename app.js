const express = require('express')
const UserHandler = require('./domains/users/user.handler')

const app = express()

app.use(express.json())

app.get('/health', (req, res) => {
    return res.json({msg: 'running...'})
})

app.get('/users', UserHandler.listAllUsers)

app.get('/user/:id', UserHandler.userDetails)

app.delete('/user/:id', UserHandler.removeUser)

app.put('/user/:id', UserHandler.userUpdate)

app.post('/user', UserHandler.createUser)

module.exports = app

