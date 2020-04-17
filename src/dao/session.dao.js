const mongoose = require('mongoose');
const sessionSchema = require('../models/session.model');

const authModel = mongoose.model('session', sessionSchema);
module.exports = authModel;