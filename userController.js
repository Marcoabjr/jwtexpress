const userService = require('../services/userService');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();
jwt = require('jsonwebtoken');


const create = async (req, res) => {
    const { name, username, email, password, confirmPassword} = req.body;

    if (!name || !username || !email || !password || confirmPassword) {
        res.status(400).send({ message: 'Necessário preencher todos os campos' });
        return;
    }

    if (password !== confirmPassword) {
        res.status(422).send({ message: 'Senhas não conferem' });
        return;
    }

    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
        res.status(409).send({ message: 'Email existente' });
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    try {
        const user = await userService.create({
            name,
            username,
            email,
            password: passwordHash
        });

        if (!user) {
            return res.status(400).send({ message: 'Erro ao criar usuário' });
        }

        res.status(201).send({
            message: 'Criação de usuário feita com exito',
            user: {
                id: user._id,
                name,
                username,
                email
            }
        });
    } catch (error) {
        return res.status(500).send({ message: 'Erro no servidor, tente novamente mais tarde' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username) {
        res.status(400).send({ message: 'User obrigátorio' });
        return;
    }
    if (!password) {
        res.status(400).send({ message: 'Obrigátorio ter senha' });
        return;
    }   

    const user = await User.findOne({ username: username });
    if (!user) {
        res.status(404).send({ message: 'Erro ao encontrar usuário ' });
        return;
    }
    
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
        res.status(401).send({ message: 'Erro na senha, por favor conferir' });
        return;
    }
    try{
        const secret = process.env.SECRET;
        const token = jwt.sign({
             id: user._id }, 
             secret,)
             res.status(200).send({ message: 'Login feito', token: token });
    }catch(error){
        console.log("Erro de token", error);
        return res.status(500).send({ message: 'Servidor com erro, nao tente mais' });
    }
}


module.exports = { create, loginUser };