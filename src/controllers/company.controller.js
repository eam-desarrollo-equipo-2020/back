
var Company = require('../dao/company.dao');

var controller = {
  createCompany: function (req, res)  {
    
    var company = new Company();
    company.id_company  = req.body.id_company;
    company.razon_social  = req.body.razon_social;
    company.representante_legal  = req.body.representante_legal;
    company.ciudad  = req.body.ciudad;
    company.departamento  = req.body.departamento;
    company.objeto_social  = req.body.objeto_social;
    

    company.save((err, doc) => {
      if (!err) {
        console.log(res);
      }else {
        console.log('Error during record insertion : ' + err);
      }
    });

  }
};
module.exports = controller;