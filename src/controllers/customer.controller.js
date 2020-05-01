const Customer = require('../dao/customer.dao');
const Session = require('../dao/session.dao');

exports.createCustomer = async(req, res) => {
    const token = req.headers.token;
    const { id_card, name, company } = req.body;

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