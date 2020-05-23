const Order = require('../controllers/order.controller');
module.exports = (router) => {
	router.post('/create-order', Order.createOrder);
	router.post('/list-order/:client', Order.findOrderByClient);
};