const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	pwd: {
		type: String,
		required: true,
		trim: true
	},
	active: {
		type: Boolean,
		default: true
	}
}, {
	versionKey: false,
	timestamps: true //guardar la fecha de actualizacion y de guardado
});

module.exports = userSchema;