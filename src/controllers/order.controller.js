
var Order = require('../dao/order.dao');

var controller = {
  createOrder: function (req, res) {

    var order = new Order();
    order.client = req.body.client;
    order.detail = req.body.detail;   
    USER.findOne({ access_token: req.headers.token })
      .then(session => {
        if (session.state) {
          order.id = session.id_user
          order.save((err, orderStored) => {
            if (err) return res.status(500).json({
              message: 'Error saving order'
            });
            if (!orderStored) return res.status(400).json({
              message: 'Could not save order'
            });
            return res.status(200).json({
              order: orderStored
            });
          });
        } else {
          res.status(409).json({
            message: 'The token has expired'
          });
        }
      });
  },

  // listCompanies: function (req, res) {
  //   product.find({}).sort('-razon_social').exec((err, companies) => {
  //     if (err) return res.status(500).json({
  //       message: 'Error loading data'
  //     });
  //     if (!companies) return res.status(404).json({
  //       message: 'There are no companies to show'
  //     });
  //     return res.status(200).json({
  //       companies
  //     });
  //   });
  // },
};
module.exports = controller;