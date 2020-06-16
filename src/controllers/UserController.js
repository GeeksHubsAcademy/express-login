const { User, Token } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserController = {
    getAll(req, res) {
        User.findAll()
            .then(users => res.send(users))
            .catch(error => {
                console.error(error);
                res.status(500).send({ message: 'There was a problem trying to create the user' });
            })
    },
    async signup(req, res) {
        try {
            //hasheamos la contraseña que nos viene en el body de la request
            const hash = await bcrypt.hash(req.body.password, 9); // el 9 son las rondas de salt
            req.body.password = hash; //reescribo la contraseña por el hash obtenido
            const user = await User.create(req.body);
            res.status(201).send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to create the user' });
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                throw new Error('Wrong Credentials');
            }
            const token = jwt.sign({ id: user.id }, 'mimamamemima', { expiresIn: '1y' });
            await Token.create({ token, UserId: user.id, revoked: false });
            res.send({
                // user: {...user.get(), password: undefined },
                user,
                token
            })
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: 'Wrong Login'
            });
        }
    }
}

module.exports = UserController;