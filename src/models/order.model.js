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
  status: {
    type: Boolean,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  detail: [
    {
      'product': String,
      'quantity': Number,
      'price': Number
    }
  ]
  

}, {
	versionKey: false,
	timestamps: true //guardar la fecha de actualizacion y de guardado
});

module.exports = orderSchema;