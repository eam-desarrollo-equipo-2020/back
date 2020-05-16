
var Product = require('../dao/product.dao');
const USER = require('../dao/session.dao.js');

var controller = {
  createProduct: function (req, res) {

    const { name, detail, price, lot, quantity, category } = req.body;
    const token = req.headers.token;

    if (name === undefined || detail === undefined || price === undefined || lot === undefined
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

  listProduct: function (req, res) {
    const token = req.headers.token;
    const { value } = req.body;
    if (token === undefined  || value === undefined) return res.status(409).json({ msg: 'fields are missing' });
    if (token === ''  || value === '') return res.status(409).json({ msg: 'some fields are empty' });

    USER.findOne({ access_token: token })
      .then(session => {
        if (session.state) {
          Product.findOne({ _id: value}, { _id: 0}).exec((err, products) => {
            if (err) return res.status(500).json({
              message: 'Error loading data'
            });
            if (!products || products === null) return res.status(404).json({
              message: 'There are no products to show'
            });
            return res.status(200).json({
              products
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