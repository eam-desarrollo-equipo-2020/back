const Profile = require('../controllers/profile.controller');
module.exports = (router) => {
	router.post('/create-profile', Profile.createProfile);
	router.post('/update-profile/:id', Profile.updateProfile);
	router.get('/profiles', Profile.listAllProfiles);
	router.get('/profile', Profile.listProfile);
	router.get('/profile-user', Profile.profileOfUser);
};