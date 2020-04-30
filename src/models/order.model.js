const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const orderSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: [true, 'Debe existir una referencia a un perfil de usuario']
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