const user_type = require('../controllers/user_type.controller');
module.exports = (router) => {
	router.post('/user-type', user_type.create);
};