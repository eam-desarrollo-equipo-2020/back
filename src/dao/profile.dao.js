const mongoose = require('mongoose');
const profileSchema = require('../models/profile.model');

profileSchema.statics = {
	create: function (data, cb) {
		const profile = new this(data);
		profile.save(cb);
	}

	
	
};

const profileModel = mongoose.model('Profile', profileSchema);
module.exports = profileModel;