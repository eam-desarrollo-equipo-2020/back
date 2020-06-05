const Order = require('../controllers/order.controller');
module.exports = (router) => {
	router.post('/create-order', Order.createOrder);
	router.get('/orderbyclient/:name', Order.findOrderByClient);
};