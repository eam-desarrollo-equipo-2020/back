const mongoose = require('mongoose');
const productSchema = require('../models/product.model');

productSchema.statics = {
  create: function(data,cb) {
    const product = new this(data);
    product.save(cb);
  }
};
const productSchemaModel = mongoose.model('Product', productSchema);
module.exports = productSchemaModel;