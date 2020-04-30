
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
    USER.findOne({access_token: req.headers.token})
            .then(session => {
                if(session.state){
                    company.id = session.id_user
                    company.save((err, companyStored) => {
                        if (err) return res.status(500).json({
                            message: 'Error saving company'
                        });
                        if (!companyStored) return res.status(400).json({
                            message: 'Could not save company'
                        });
                        return res.status(200).json({
                            company: companyStored
                        });
                    });
                } else {
                    res.status(409).json({
                        message: 'The token has expired'
                    });
                }
            });
  },

  listCompanies: function (req, res) {
    Company.find({}).sort('-razon_social').exec((err, companies) => {
      if (err) return res.status(500).json({
        message: 'Error loading data'
      });
      if (!companies) return res.status(404).json({
        message: 'There are no companies to show'
      });
      return res.status(200).json({
        companies
      });
    });
  },
};
module.exports = controller;