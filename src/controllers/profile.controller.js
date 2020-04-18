'use strict'

var Profile = require('../models/profile.model');

var controller = {

    createProfile: function (req, res) {
        var profile = new Profile();
        var params = req.body;
        profile.name = params.name;
        profile.id = params.id;
        profile.phone = params.phone;
        profile.city = params.city;
        profile.birth_date = params.birth_date;

        profile.save((err, profileStored) => {
            if (err) return res.status(500).send({
                message: 'Error al guardar perfil'
            });
            if (!profileStored) return res.status(400).send({
                message: 'No se ha podido guardar el perfil'
            });
            return res.status(200).send({
                profile: profileStored
            });
        });
    },
  };
  module.exports = controller;
