
var Company = require('../dao/company.dao');

var controller = {
  createCompany: function (req, res) {

    var company = new Company();
    company.id_company = req.body.id_company;
    company.razon_social = req.body.razon_social;
    company.representante_legal = req.body.representante_legal;
    company.ciudad = req.body.ciudad;
    company.departamento = req.body.departamento;
    company.objeto_social = req.body.objeto_social;
    company.save((err, doc) => {
      if (!err) {
        console.log(res);
      } else {
        console.log('Error during record insertion : ' + err);
      }
    });
  },

  listCompanies: function (req, res) {
    Company.find({}).sort('-razon_social').exec((err, companies) => {
      if (err) return res.status(500).send({
        message: 'Error loading data'
      });
      if (!companies) return res.status(404).send({
        message: 'There are no companies to show'
      });
      return res.status(200).send({
        companies
      });
    });
  },
};
module.exports = controller;