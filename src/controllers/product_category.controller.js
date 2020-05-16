const prodCat = require('../dao/product_category.dao');
const Session = require('../dao/session.dao');

exports.create = async (req, res) => {
	const token = req.headers.token;
	const { name, description } = req.body;

	if (token === undefined || name === undefined || description === undefined)
		return res.status(409).json({ msg: 'fields are missing' });
	if (token === '' || name === '' || description === '')
		return res.status(409).json({ msg: 'some fields are empty' });

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

exports.read = async (req, res) => {
	const token = req.headers.token;
	if (token === undefined) return res.status(409).json({ msg: 'fields are missing' });
	if (token === '') return res.status(409).json({ msg: 'some fields are empty' });

	const session = await Session.findOne({ access_token: token });

	if (session && session.state === true) {
		const prodCats = await prodCat.find();

		if (prodCats) {
			res.status(200).json({ prodCats });
		} else {
			res.status(404).json({ msg: 'There are no product categories to show' });
		}
	} else {
		res.status(403).json({
			msg: 'access denied',
			causes: 'Token does not exist or has expired'
		});
	}
};