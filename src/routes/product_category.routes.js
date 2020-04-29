const ProductCategory = require('../controllers/product_categoy.controller');
module.exports = (router) => {
	router.post('/create-prod_cat', ProductCategory.createProdCat);
}