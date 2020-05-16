
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
    Profile.find({}).sort('id_card').exec((err, companies) => {
      if (err) return res.status(500).json({
        message: 'Error loading data'
      });
      if (!companies) return res.status(404).json({
        message: 'There are no companies to show'
      });
      return res.status(200).json({
        companies
      });
    });
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
