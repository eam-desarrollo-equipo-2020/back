
var Profile = require('../dao/profile.dao');
const USER = require('../dao/session.dao.js');

var controller = {

    createProfile: function (req, res) {
        var profile = new Profile();
        var params = req.body;
        profile.name = params.name;
        profile.id_card = params.id_card;
        profile.phone = params.phone;
        profile.city = params.city;
        profile.birth_date = params.birth_date;
        USER.findOne({access_token: req.headers.token})
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
  }

};
  module.exports = controller;
