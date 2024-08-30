const {User} = require('../../models/index')
const bcrypt = require('bcryptjs')

const salt = bcrypt.genSaltSync(10)

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

    //validar usuário antes de gravar.
    //vamos verificar se já existe um usuário gravado com esse email na base

    const userVerify = await User.findOne({where: {email}})

    if(userVerify) {
        return res.status(409).json({msg: 'Usuário já cadastrado.'})
    }

    //verifica se existe a chave username e se a chave tem conteúdo ou está vazia
    if(!username) {
        return res.status(500).json({msg: 'Username é necessário'})
    }


    if(!email) {
        return res.status(500).json({msg: 'Email é necessário'})
    }

    if(!password) {
        return res.status(500).json({msg: 'Password é necessário'})
    }


    const result = {
        username: username,
        email: email,
        password: bcrypt.hashSync(password, salt)
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


exports.signIn = async (req, res) => {
    const { email, password } = req.body

    if(!email) {
        return res.status(500).json({msg: 'é necessário informar o email'})
    }

    if(!password) {
        return res.status(500).json({msg: 'é necessário informar a senha'})
    }

    //verificar se o usuário(email) existe na base
    //crie o método que verifica se existe usuário na base
    const userData = await User.findOne({where: {email}})

    
    if(!userData){
        return res.status(404).json({msg: 'Usuário não encontrado'})
    }

    //se o usuário existe, agora eu vou validar a senha
    const passwordVerify = bcrypt.compareSync(password, userData.password);

    //validar a senha
    if(!passwordVerify) {
        return res.status(500).json({msg: 'senha não confere.'})
    }

    //criar o método que retorna o JWT

    return res.status(200).json({msg: 'login bem sucedido'})

}