const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String
	}
}, {
	versionKey: false,
	timestamps: true //guardar la fecha de actualizacion y de guardado
});

module.exports = userSchema;