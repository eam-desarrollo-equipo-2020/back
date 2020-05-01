const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const customerSchema = new Schema({
    id_card: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true //guardar la fecha de actualizacion y de guardado
});

module.exports = customerSchema;