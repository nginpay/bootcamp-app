const express = require('express')
const UserHandler = require('./domains/users/user.handler')

const app = express()

app.use('/health', (req, res) => {
    return res.json({msg: 'running...'})
})

app.get('/users', UserHandler.listAllUsers)

module.exports = app

