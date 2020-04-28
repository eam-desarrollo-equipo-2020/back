const Company = require('../controllers/company.controller');
module.exports = (router) => {
	router.post('/create-company', Company.createCompany);
	router.post('/list-companies', Company.listCompanies);
};