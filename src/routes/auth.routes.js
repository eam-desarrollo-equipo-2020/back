const Users = require('../controllers/auth.controller');
module.exports = (router) => {
	router.post('/register', Users.createUser);
	router.post('/login', Users.loginUser);
	router.put('/logout', Users.logoutUser);
	router.get('/verify', Users.verifySession);
	router.delete('/users/:id', Users.delete);
}
