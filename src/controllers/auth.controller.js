const User = require('../dao/auth.dao');
const Session = require('../dao/session.dao')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.createUser = (req, res, next) => {
	const newUser = {
		email: req.body.email,
		pwd: bcrypt.hashSync(req.body.pwd) //encriptamos la pwd
	}

	User.create(newUser, (err, user) => {
		//console.log('el error es', err) asi sabemos el codigo del error lo imprimira en consola
		if (err && err.code == 11000) return res.status(409).json({ msg: 'Email already exists' }); //11000 es el codigo q retorna 
		if (err) return res.status(500).json({ msg: 'Server error1' });

		let expiresIn = new Date();
		expiresIn.setMinutes(expiresIn.getMinutes() + 10);
		expiresIn = (expiresIn / 1000).toFixed(0);

		const accessToken = jwt.sign({ id: user.id },
			SECRET_KEY, {
			expiresIn: expiresIn
		});

		//lo q devolveremos al front
		const dataUser = {
			email: user.email,
			accessToken: accessToken,
			expiresIn: expiresIn
		}

		// Se guarda la sesion..
		const newSession = {
			id_user: user._id,
			access_token: accessToken,
			expires_in: expiresIn,
			state: true
		}

		// Cuando de crea la sesion, se retonan los datos..
		Session.create(newSession, (err, session) => {
			if (err) return res.status(500).json({ msg: 'Server error2', err: err });
			res.status(200).json({ user: dataUser });
		});
	});
};

exports.loginUser = (req, res, next) => {
	const userData = {
		email: req.body.email,
		pwd: req.body.pwd
	}

	User.findOne({ email: userData.email }, (err, user) => {
		if (err) return res.status(500).send('Server error!');

		if (!user) {
			//email no existe
			res.status(409).send({ message: 'Datos incorrectos' });
		} else {
			const resultPwd = bcrypt.compareSync(userData.pwd, user.pwd);
			if (resultPwd) {
				//contraseña correcta
				let expiresIn = new Date();// Se toma fecha y hora actual
				expiresIn.setMinutes(expiresIn.getMinutes() + 10);// Se anexan 30 minutos.
				expiresIn = (expiresIn / 1000).toFixed(0); // Se combierte a fecha unix para mejor gestión
				const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });

				//lo q devolveremos al front
				const dataUser = {
					email: user.email,
					accessToken: accessToken,
					expiresIn: expiresIn
				}

				// Se define la sesion
				const newSession = {
					id_user: user._id,
					access_token: accessToken,
					expires_in: expiresIn,
					state: true
				}

				// Cuando se crea la sesion se responde al cliente con los datos.
				Session.create(newSession, (err, session) => {
					if (err) return res.status(500).json({ msg: 'Server error' });
					res.status(200).json({ user: dataUser });
				});
			} else {
				//contraseña incorrecta
				res.status(409).send({ message: 'Datos incorrectos' });
			}
		}
	});
};

exports.logoutUser = async (req, res) => {
	const { token } = req.headers;
	const session = await Session.findOne({ access_token : token });

	if (session && session.state !== false) {
		await session.updateOne({ state: false });
		res.status(200).json({ msg: 'session finalized'});
	} else {
		res.status(409).json({ msg: 'this session is not active'});
	}
};

exports.verifySession = (req, res) => {
	
};