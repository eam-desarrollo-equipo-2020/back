const Company = require('../dao/company.dao');

exports.createCompany = (req,res, next) => {
  const newCompany = {
    razon_social: req.body.razon_social,
    representante_legal: req.body.representante_legal,
    ciudad: req.body.ciudad,
    departamento: req.body.departamento,
    objeto_social: req.body.objeto_social
  };

  Company.create(newCompany, (err, comp) => {
    
  });

};