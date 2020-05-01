const mongoose = require('mongoose');
const customerSchema = require('../models/customer.model');

customerSchema.statics = {
    create: function(data, cb) {
        const customer = new this(data);
        customer.save(cb);
    }
};
const customerSchemaModel = mongoose.model('Customer', customerSchema);
module.exports = customerSchemaModel;