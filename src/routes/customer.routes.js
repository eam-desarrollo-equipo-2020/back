const Customer = require('../controllers/customer.controller');
module.exports = (router) => {
    router.post('/customer', Customer.createCustomer);
};