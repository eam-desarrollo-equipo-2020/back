
var Product = require('../dao/product.dao');

var controller = {
  createProduct: function (req, res) {

    var product = new Product();
    product.name = req.body.name;
    product.detail = req.body.detail;
    product.price = req.body.price;
    product.lot = req.body.lot;
    product.quantity = req.body.quantity;
    product.category = req.body.category;
    USER.findOne({ access_token: req.headers.token })
      .then(session => {
        if (session.state) {
          product.id = session.id_user
          product.save((err, productStored) => {
            if (err) return res.status(500).json({
              message: 'Error saving product'
            });
            if (!productStored) return res.status(400).json({
              message: 'Could not save product'
            });
            return res.status(200).json({
              product: productStored
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