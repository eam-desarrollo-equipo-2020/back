const BaseRepository = require('./base.repository');

class CompanyRepository extends BaseRepository{
  constructor({Company}) {
    super(Company);
    _company = Company;
  }
}

module.exports = CompanyRepository;