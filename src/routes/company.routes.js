const Company = require('../controllers/company.controller');
module.exports = (router) => {
	router.post('/create-company', Company.createCompany);
	router.get('/list-companies', Company.listCompanies);
	router.get('/companies/:id', Company.findCompany);
	router.get('/company/:name', Company.findCompanyByName);
	router.put('/company/:id', Company.updateCompany);
};