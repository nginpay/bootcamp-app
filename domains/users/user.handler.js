const {User} = require('../../models/index')

exports.listAllUsers = async (req, res) => {
    const usersList = await User.findAll()
    return res.json(usersList)
}

exports.userDetails = async (req, res) => {

    const id = req.params.id

    const details = await User.findOne({where: {id}})

    return res.json(details)
}

exports.createUser = async(req, res) => {
    const {username, email, password} = req.body

    const result = {
        username: username,
        email: email,
        password: password
    }

    //método para gravar o usuário no banco de dados
    const newUserAdded = await User.create(result)

    //retorno do usuário gravado
    return res.json(newUserAdded)
}

exports.removeUser = async (req, res) => {
    const id = req.params.id

    const userRemoved = await User.destroy({where: {id}})

    return res.json({msg: `user ${id} removed`})

}

exports.userUpdate = async (req, res) => {
    const id = req.params.id

    const data = req.body

    const newData = await User.update(data, {where: {id}})

    return res.json({msg: `user ${id} updated`})
}