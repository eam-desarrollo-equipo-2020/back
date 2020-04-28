const mongoose = require('mongoose');
const user_typeSchema = require('../models/user_type.model');

const authModel = mongoose.model('user_type', user_typeSchema);
module.exports = authModel;