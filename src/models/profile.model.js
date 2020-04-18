const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const profileSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	id: {
		type: Number,
		required: true,
		trim: true,
		unique: true
	},
	phone: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	city: {
		type: String,
		required: true,
		trim: true,
	},
	birth_date: {
		type: Date,
		required: true,
	},
	
},{
	versionKey: false,
	timestamps: true //guardar la fecha de actualizacion y de guardado
});

module.exports = profileSchema;