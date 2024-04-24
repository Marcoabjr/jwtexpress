const route = require('express').Router();
const UserController = require('../controllers/userController');
const checkToken = require('../middlewares/userMiddewares');
const User = require('../models/User');

route.get('/:id', checkToken, async (req, res) => {
    const id = req.params.id;
    console.log('ID:', id); 

    try {
        const user = await User.findById(id, "-password");
        console.log('User:', user); 

        if (!user) {
            return res.status(404).send({ message: 'Usuário não encontrado' });
        }

        res.send(user);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).send({ message: 'Erro servidor' });
    }
});

module.exports = route;
