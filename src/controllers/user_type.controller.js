const User_type = require('../dao/user_type.dao');
const Session = require('../dao/session.dao');

exports.create = async (req, res) => {
	const token = req.headers.token;
	const { name, description } = req.body;

	const session = await Session.findOne({ access_token: token });

	if (session && session.state === true) {
		User_type.create({ name: name, description: description }, (err, user_type) => {
			if(err){
				if(err.code ==11000) {
					res.status(409).json({ msg: `user type already exists` });
				} else {
					console.log(err);
					res.status(500).json({ msg: 'server error' });
				}
			} else {
				res.status(200).json({ msg: `user type ${name} has been created`});
			}
		});
	} else {
		res.status(403).json({
			msg: 'access denied',
			causes: 'Token does not exist or has expired'
		});
	}
};