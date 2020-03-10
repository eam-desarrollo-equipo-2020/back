const User = require('../dao/auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.createUser = (req, res, next) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password) //encriptamos la pw
    }

    User.create(newUser, (err, user) => {
        //console.log('el error es', err) asi sabemos el codigo del error lo imprimira en consola
        if (err && err.code == 11000) return res.status(409).send('Email already exists'); //11000 es el codigo q retorna 
        if (err) return res.status(500).send('Server error');
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id },
            SECRET_KEY, {
            expiresIn: expiresIn
        });
        //lo q devolveremos al front
        const dataUser = {
            name: user.name,
            email: user.email,
            accessToken: accessToken,
            expiresIn: expiresIn
        }

        //response
        res.send({ dataUser });
    });
}

exports.loginUser = (req, res, next) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    }
    User.findOne({ email: userData.email }, (err, user) => {
        if (err) return res.status(500).send('Server error!');
        if (!user) {
            //email no existe
            res.status(409).send({ message: 'Datos incorrectos' });
        } else {
            const resultPassword = bcrypt.compareSync(userData.password, user.password);
            if (resultPassword) {
                //contraseña correcta
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
                //lo q devolveremos al front
                const dataUser = {
                    name: user.name,
                    email: user.email,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }

                res.send({ dataUser });
            } else {
                //contraseña incorrecta
                res.status(409).send({ message: 'Datos incorrectos' });
            }
        }
    });

}