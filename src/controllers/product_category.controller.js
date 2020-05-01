const prodCat = require('../dao/product_category.dao');
const Session = require('../dao/session.dao');

exports.create = async (req, res) => {
	const token = req.headers.token;
	const { name, description } = req.body;

	const session = await Session.findOne({ access_token: token });

	if (session && session.state === true) {
		prodCat.create({ name: name, description: description }, (err, prodCat) => {
			if(err){
				if(err.code ==11000) {
					res.status(409).json({ msg: `product category type already exists` });
				} else {
					console.log(err);
					res.status(500).json({ msg: 'server error' });
				}
			} else {
				res.status(200).json({ msg: `product category ${name} has been created`});
			}
		});
	} else {
		res.status(403).json({
			msg: 'access denied',
			causes: 'Token does not exist or has expired'
		});
	}
};