const mongoose = require('mongoose');
const authSchema = require('../models/auth.model');

authSchema.statics = {
	create: function (data, cb) {
		const user = new this(data);
		user.save(cb);
	},
	login: function (query, cb) {
		this.find(query, cb);
	}
}

const authModel = mongoose.model('users', authSchema);
module.exports = authModel;