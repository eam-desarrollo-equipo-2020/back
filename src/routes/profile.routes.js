const Profile = require('../controllers/profile.controller');
module.exports = (router) => {
	router.post('/create-profile', Profile.createProfile);
	router.post('/list-profile', Profile.listClients);
	router.post('/update-profile/:id', Profile.updateProfile);
};