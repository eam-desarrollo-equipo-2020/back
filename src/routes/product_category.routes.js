const ProductCategory = require('../controllers/product_category.controller');
module.exports = (router) => {
	router.post('/create-prod_cat', ProductCategory.create);
	router.get('/prod-categories', ProductCategory.read);
	router.put('/prod-categories/:id', ProductCategory.update);
}