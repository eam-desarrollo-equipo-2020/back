const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const CompanySchema = new Schema({
  id_company:{
    type: String,
    required: true
  },
  razon_social: {
    type: String,
     required: true
    },
  representante_legal: {
    type: String,
     required: true
    },
  ciudad: {
    type: String,
     required: false
    },
  departamento: {
    type: String,
     required: true
    },
  objeto_social: {
    type: String,
     required: false
    }
});

module.exports = companySchema;