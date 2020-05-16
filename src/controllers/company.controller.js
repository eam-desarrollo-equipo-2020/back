
var Company = require('../dao/company.dao');
const USER = require('../dao/session.dao.js');
var controller = {
  createCompany: function (req, res) {
    const { razon_social, representante_legal, ciudad, departamento, objeto_social } = req.body;
    const token = req.headers.token;

    if( razon_social === undefined || representante_legal === undefined
      || ciudad === undefined || departamento === undefined || objeto_social === undefined
      || token === undefined) return res.status(409).json({ msg: 'fields are missing' });
    
    if (razon_social === '' || representante_legal === '' || ciudad === '' || departamento === ''
      || objeto_social === '' || token === '')
      return res.status(409).json({ msg: 'some fields are empty' });

    var company = new Company();
    company.razon_social = razon_social;
    company.representante_legal = representante_legal;
    company.ciudad = ciudad;
    company.departamento = departamento;
    company.objeto_social = objeto_social;
    USER.findOne({access_token: token})
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

  findCompany: async (req, res) => {
    const token = req.headers.token;
    if (token === undefined) return res.status(409).json({ msg: 'fields are missing' });
	  if (token === '') return res.status(409).json({ msg: 'some fields are empty' });
    const session = await USER.findOne({ access_token: token });

    if (session && session.state === true) {
      const id_company = req.params.id;
      
      const company = await Company.findById(id_company);
      
      if (company) {
        res.status(200).json(company);
      } else {
        res.status(404).json({ msg: 'this company does not exist' });
      }

    } else {
      res.status(403).json({
        msg: 'access denied',
        causes: 'Token does not exist or has expired'
      });
    }
  },

  findCompanyByName: async (req, res) => {
    const token = req.headers.token;
    if (token === undefined) return res.status(409).json({ msg: 'fields are missing' });
	  if (token === '') return res.status(409).json({ msg: 'some fields are empty' });
    const session = await USER.findOne({ access_token: token });

    if (session && session.state === true) {
      const name_company = req.params.name;
      
      
      const company = await Company.find({"razon_social" : {'$regex': name_company}});
      
      if (company) {
        res.status(200).json(company);
      } else {
        res.status(404).json({ msg: 'Not exist almost a company with this expression' });
      }

    } else {
      res.status(403).json({
        msg: 'access denied',
        causes: 'Token does not exist or has expired'
      });
    }
  }
};
module.exports = controller;