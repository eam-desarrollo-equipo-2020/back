
var Profile = require('../dao/profile.dao');
const USER = require('../dao/session.dao.js');

var controller = {

    createProfile: function (req, res) {
        var { name, id_card, phone, city, birth_date } = req.body;
        var { token } = req.headers;

        if( name === undefined || id_card === undefined || phone === undefined
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
        USER.findOne({access_token: token})
            .then(session => {
                if(session.state){
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
  

  listClients: function (req, res) {
    Profile.find({}).sort('id_card').exec((err, profiles) => {
      if (err) return res.status(500).json({
        message: 'Error loading data'
      });
      if (!profiles) return res.status(404).json({
        message: 'There are no profiles to show'
      });
      return res.status(200).json({
        profiles
      });
    });
  },

  
updateProfile: function(req, res){

  var { name, id_card, phone, city, birth_date } = req.body;
  var { token } = req.headers;

  if( name === undefined || id_card === undefined || phone === undefined
      || city === undefined || birth_date === undefined || token === undefined)
      return res.status(409).json({ msg: 'fields are missing' });
  
  if (name === '' || id_card === '' || phone === '' || city === ''
      || birth_date === '' || token === '')
      return res.status(409).json({ msg: 'some fields are empty' });

  USER.findOne({access_token: token})
    .then(session => {
        if(session.state){
          Profile.findByIdAndUpdate( req.params.id, {$set: {
            name: req.body.name,
            id_card: req.body.id_card,
            phone: req.body.phone,
            city: req.body.city,
            birth_date: req.body.birth_date,
        }}, { new: true },
        function( err, profile){
          if( err )return res.status(500).json({
            message: 'Error saving profile'
          });
          if (!profile) return res.status(400).json({
            message: 'Could not save profile'
          });
          return res.status(200).json({
            profile: profile
          });
        });
        } else {
            res.status(409).json({
                message: 'The token has expired'
            });
        }
    });
},

};
  module.exports = controller;
