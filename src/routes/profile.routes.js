const Profile = require('../controllers/profile.controller');
module.exports = (router) => {
	router.post('/create-profile', Profile.createProfile);
}