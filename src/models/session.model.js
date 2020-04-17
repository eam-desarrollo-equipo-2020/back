const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const sessionSchema = new Schema({
	id_user: {
		type: String,
		required: true
	},
	access_token:{
		type: String,
		required: true
	},
	expires_in: {
		type: Number,
		required: true
	},
	state: {
		type: Boolean,
		required: true
	}
}, {
	versionKey: false,
	timestamps: true
});

module.exports = sessionSchema;
