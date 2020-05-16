const Customer = require('../dao/customer.dao');
const Session = require('../dao/session.dao');

exports.createCustomer = async(req, res) => {
    const token = req.headers.token;
    const { id_card, name, company } = req.body;

    if (token === undefined || id_card === undefined || name === undefined || company === undefined)
        return res.status(409).json({ msg: 'fields are missing' });
    if (token === '' || id_card === '' || name === '' || company === '')
        return res.status(409).json({ msg: 'some fields are empty' });

    const session = await Session.findOne({ access_token: token });

    if (session && session.state === true) {
        Customer.create({ id_card: id_card, name: name, company: company }, (err, customer) => {
            if (err) {
                if (err.code == 11000) {
                    res.status(409).json({ msg: `customer already exists` });
                } else {
                    console.log(err);
                    res.status(500).json({ msg: 'Bad request, ponte las pilas' });
                }
            } else {
                res.status(200).json({ msg: `customer ${name} has been created` });
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
		const customers = await Customer.find();

		if (customers) {
			res.status(200).json({ customers });
		} else {
			res.status(404).json({ msg: 'There are no customers to show' });
		}
	} else {
		res.status(403).json({
			msg: 'access denied',
			causes: 'Token does not exist or has expired'
		});
	}
};