
var Product = require('../dao/product.dao');
const USER = require('../dao/session.dao.js');

var controller = {
  createProduct: function (req, res) {

    const { name, detail, price, lot, quantity, category } = req.body;
    const token = req.headers.token;

    if(name === undefined || detail === undefined || price === undefined || lot === undefined
      || quantity === undefined || category === undefined || token === undefined)
      return res.status(409).json({ msg: 'fields are missing' });
      
    if (name === '' || detail === '' || price === '' || lot === '' || quantity === ''
      || category === '' || token === '') 
      return res.status(409).json({ msg: 'some fields are empty' });

    var product = new Product();
    product.name = name;
    product.detail = detail;
    product.price = price;
    product.lot = lot;
    product.quantity = quantity;
    product.category = category;
    USER.findOne({ access_token: token })
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