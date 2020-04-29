const mongoose = require('mongoose');
const productCategorySchema = require('../models/product_category.model');

productCategorySchema.statics = {
	create: function (data, cb) {
		const prod_cat = new this(data);
		prod_cat.save(cb);
	}
}

const productCategoryModel = mongoose.model('Product_Category', productCategorySchema);
module.exports = productCategoryModel;