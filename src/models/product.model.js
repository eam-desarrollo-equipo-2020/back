const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false
    },
    lot: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true //guardar la fecha de actualizacion y de guardado
});

module.exports = productSchema;