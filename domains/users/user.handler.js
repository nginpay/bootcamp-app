const {User} = require('../../models/index')

exports.listAllUsers = async (req, res) => {
    const usersList = await User.findAll()
    return res.json(usersList)
}