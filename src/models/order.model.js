const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const orderSchema = new Schema({
  client: {
    type: String,
    required: true
  },
  detail: {
    type: String,
     required: true
    }
}, {
	versionKey: false,
	timestamps: true //guardar la fecha de actualizacion y de guardado
});

module.exports = orderSchema;