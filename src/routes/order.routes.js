const Order = require('../controllers/order.controller');
module.exports = (router) => {
	router.post('/create-order', Order.createOrder);
	router.post('/list-order/:client', Order.findOrderByClient);
	router.post('/update-order/:id', Order.updateOrder);
	router.get('/orderbyclient/:name', Order.findOrderByClient);
};