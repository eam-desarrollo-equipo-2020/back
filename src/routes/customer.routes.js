const Customer = require('../controllers/customer.controller');
module.exports = (router) => {
    router.post('/customer', Customer.createCustomer);
    router.get('/customer', Customer.read);
    router.get('/customer/:id', Customer.readById);
};