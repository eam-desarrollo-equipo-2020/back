const Product = require('../controllers/product.controller');
module.exports = (router) => {
	router.post('/create-product', Product.createProduct);
};