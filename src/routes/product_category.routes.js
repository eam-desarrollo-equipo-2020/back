const ProductCategory = require('../controllers/product_category.controller');
module.exports = (router) => {
	router.post('/create-prod_cat', ProductCategory.create);
}