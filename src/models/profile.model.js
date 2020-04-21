const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//var Users = mongoose.model('src/dao/auth.dao');
mongoose.set('useCreateIndex', true);

const profileSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	id_card: {
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
	// user_info: { 
	// 	type: Schema.ObjectId, 
	// 	ref: Users 
	// }
	id: {
		type: String,
		required: true,
	}
}, {
	versionKey: false,
	timestamps: true //guardar la fecha de actualizacion y de guardado
});

module.exports = profileSchema;