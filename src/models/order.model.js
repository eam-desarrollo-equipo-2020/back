const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const orderSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  client: {
    type: String,
    required: true
  },
  responsible :{
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  detail: [
    {
      'product': String,
      'cantidad': String
    }
  ]
  

}, {
	versionKey: false,
	timestamps: true //guardar la fecha de actualizacion y de guardado
});

module.exports = orderSchema;