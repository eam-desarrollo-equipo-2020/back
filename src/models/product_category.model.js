const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const productCategorySchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		required: true,
		trim: true,
	}
}, {
	versionKey: false,
	timestamps: true //guardar la fecha de actualizacion y de guardado
});

module.exports = productCategorySchema;