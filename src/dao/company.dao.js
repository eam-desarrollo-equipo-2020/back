const mongoose = require('mongoose');
const companySchema = require('../models/company.model');

companySchema.statics = {
  create: function(data,cb) {
    const company = new this(data);
    company.save(cb);
  }
};
const companySchemaModel = mongoose.model('Company', companySchema);
module.exports = companySchemaModel;