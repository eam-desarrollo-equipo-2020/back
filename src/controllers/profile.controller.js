
const Profile = require('../dao/profile.dao');
const User = require('../dao/auth.dao');
const USER = require('../dao/session.dao.js');

var controller = {

  createProfile: function (req, res) {
    var { name, id_card, phone, city, birth_date } = req.body;
    var { token } = req.headers;

    if (name === undefined || id_card === undefined || phone === undefined
      || city === undefined || birth_date === undefined || token === undefined)
      return res.status(409).json({ msg: 'fields are missing' });

    if (name === '' || id_card === '' || phone === '' || city === ''
      || birth_date === '' || token === '')
      return res.status(409).json({ msg: 'some fields are empty' });

    var profile = new Profile();
    profile.name = name;
    profile.id_card = id_card;
    profile.phone = phone;
    profile.city = city;
    profile.birth_date = birth_date;
    USER.findOne({ access_token: token })
      .then(session => {
        if (session.state) {
          profile.id = session.id_user
          profile.save((err, profileStored) => {
            if (err) return res.status(500).json({
              message: 'Error saving profile'
            });
            if (!profileStored) return res.status(400).json({
              message: 'Could not save profile'
            });
            return res.status(200).json({
              profile: profileStored
            });
          });
        } else {
          res.status(409).json({
            message: 'The token has expired'
          });
        }
      });
  },

  listAllProfiles: async (req, res) => {
    const { token } = req.headers;
    if (token === undefined) return res.status(409).json({ msg: 'Fields are missing' });
    if (token === '') return res.status(409).json({ msg: 'Some fields are empty' });
    const session = await USER.findOne({ access_token: token });

    if (session) {
      if (session.state) {
        let profiles = await Profile.find();
        let users = await User.find();
        var data = [];
        profiles.forEach(element => {
          let ele = {};
          users.forEach(element2 => {
            if (element.id == element2._id) {
              ele = {
                name: element.name,
                id_card: element.id_card,
                phone: element.phone,
                city: element.city,
                birth_date: element.birth_date,
                email: element2.email
              };
            }
          });
          data.push(ele);
        });
        if (data === '') return res.status(500).json({
          message: 'Error list profiles'
        });
        if (!data) return res.status(400).json({
          message: 'Could not list profiles'
        });
        return res.status(200).json({
          data: data
        });
      } else {
        res.status(409).json({
          message: 'The token has expired'
        });
      }
    }
  },

  listProfile: async (req, res) => {
    const { token } = req.headers;
    const { value } = req.body
    if (token === undefined || value === undefined) return res.status(409).json({ msg: 'Fields are missing' });
    if (token === '' || value === '') return res.status(409).json({ msg: 'Some fields are empty' });
    const session = await USER.findOne({ access_token: token });

    if (session) {
      if (session.state) {
        let profiles = await Profile.find();
        let users = await User.find();
        var data = [];
        profiles.forEach(element => {
          if (element.id_card === value) {
            let ele = {};
            users.forEach(element2 => {
              if (element.id == element2._id) {
                ele = {
                  name: element.name,
                  id_card: element.id_card,
                  phone: element.phone,
                  city: element.city,
                  birth_date: element.birth_date,
                  email: element2.email
                };
              }
              data.push(ele);
            });
          }
          if (data[0] === '[]') {
            res.status(400).json({
              message: 'Profile does not exist'
            });
          }
        });
        return res.status(200).json({
          data: data
        });
      } else {
        res.status(409).json({
          message: 'The token has expired'
        });
      }
    }
  },

  profileOfUser: async (req, res) => {
    const token = req.headers.token;
    if (token === undefined) return res.status(409).json({ msg: 'fields are missing' });
	  if (token === '') return res.status(409).json({ msg: 'some fields are empty' });
    const session = await USER.findOne({ access_token: token });

    if (session && session.state === true) {
      const id_search = session.id_user;
      
      const profile = await Profile.find({"id" : id_search});
      
      if (profile) {
        res.status(200).json(profile);
      } else {
        res.status(404).json({ msg: 'The user in session dont have a profile' });
      }

    } else {
      res.status(403).json({
        msg: 'access denied',
        causes: 'Token does not exist or has expired'
      });
    }
  }

/*   profileOfUser: function (req, res) {
    var { token } = req.headers;

    USER.findOne({access_token: token})
        .then(session => {
            if(session.state){
              
                const profile = Profile.find({"id" : session.id_user});

                if (profile) {
                  res.status(200).json(profile);
                } else {
                  res.status(404).json({ msg: 'The user in session dont have a profile' });
                }
   
            } else {
                res.status(409).json({
                    message: 'The token has expired'
                });
            }
        });
} */

};
module.exports = controller;
