const mongoose = require('mongoose');
const orderSchema = require('../models/order.model');

orderSchema.statics = {
  create: function(data,cb) {
    const order = new this(data);
    order.save(cb);
  }
};
const orderSchemaModel = mongoose.model('Order', orderSchema);
module.exports = orderSchemaModel;