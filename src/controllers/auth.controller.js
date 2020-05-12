const User = require('../dao/auth.dao');
const Session = require('../dao/session.dao')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.createUser = (req, res) => {
	const { email, pwd } = req.body;
	if (email === undefined || pwd === undefined) return res.status(409).json({ msg: 'fields are missing' });
	if (email === '' || pwd === '') return res.status(409).json({ msg: 'some fields are empty' });

	const newUser = {
		email: email,
		pwd: bcrypt.hashSync(pwd) //encriptamos la pwd
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

	const { email, pwd } = req.body;
	if (email === undefined || pwd === undefined) return res.status(409).json({ msg: 'fields are missing' });
	if (email === '' || pwd === '') return res.status(409).json({ msg: 'some fields are empty' });

	const userData = {
		email: email,
		pwd: pwd
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
	if (token === undefined) return res.status(409).json({ msg: 'fields are missing' });
	if (token === '') return res.status(409).json({ msg: 'some fields are empty' });
	const session = await Session.findOne({ access_token : token });

	if (session && session.state !== false) {
		await session.updateOne({ state: false });
		res.status(200).json({ msg: 'session finalized'});
	} else {
		res.status(409).json({ msg: 'this session is not active'});
	}
};

exports.verifySession = async (req, res) => {
	const { token } = req.headers;
	if (token === undefined) return res.status(409).json({ msg: 'fields are missing' });
	if (token === '') return res.status(409).json({ msg: 'some fields are empty' });
	const session = await Session.findOne({ access_token : token });
	
	if (session) {
		const state = session.state;
		let currentDate = new Date();
		let expiresIn = session.expires_in;
		currentDate = (currentDate / 1000).toFixed(0);
		
		if(currentDate < expiresIn && state !== false){
			expiresIn = new Date();
			expiresIn.setMinutes(expiresIn.getMinutes() + 10);
			expiresIn = (expiresIn / 1000).toFixed(0);
			session.updateOne({ expires_in: expiresIn });
			res.status(200).json({ msg: 'the token is active' });
		} else {
			await session.updateOne({ state: false });
			res.status(401).json({ msg: 'the token has expired' });
		}
	} else {
		res.status(401).json({ msg: 'invalid token' });
	}
};