
var Product = require('../dao/product.dao');
const USER = require('../dao/session.dao.js');
const categoryProduct = require('../dao/product_category.dao');

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
  findProductByName: async (req, res) => {
    const token = req.headers.token;
    if (token === undefined) return res.status(409).json({ msg: 'fields are missing' });
    if (token === '') return res.status(409).json({ msg: 'some fields are empty' });
    const session = await USER.findOne({ access_token: token });

    if (session && session.state === true) {
      const name_product = req.params.name;

      const product = await Product.find({ "name": { '$regex': name_product } });

      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ msg: 'Not exist almost a product with this expression' });
      }

    } else {
      res.status(403).json({
        msg: 'access denied',
        causes: 'Token does not exist or has expired'
      });
    }
  },

  findCategoryByProduct: async (req, res) => {
    const token = req.headers.token;
    if (token === undefined) return res.status(409).json({ msg: 'fields are missing' });
    if (token === '') return res.status(409).json({ msg: 'some fields are empty' });
    const session = await USER.findOne({ access_token: token });

    if (session && session.state === true) {
      const id_product = req.params.idProduct;
      if (!id_product.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(403).json({
          msg: 'bad request',
          causes: 'The id_product not is a valid ObjectId'
        });
      }
      const product = await Product.find({ _id: id_product }, { category: 1, _id: 0 });
      if (typeof product[0] !== 'undefined') {
        const category = product[0].category;
        const cat = await categoryProduct.find({ name: category }, { name: 1, description: 1 })
        if (typeof cat[0] !== 'undefined') {
          res.status(200).json(cat);
        } else {
          res.status(404).json({ msg: 'Not exist a category for the product with this ID' });
        }
      } else {
        res.status(404).json({ msg: 'Not exist a product with this ID' });
      }

    } else {
      res.status(403).json({
        msg: 'access denied',
        causes: 'Token does not exist or has expired'
      });
    }
  },

  updateProduct: async (req, res) => {
    const token = req.headers.token;
    if (token === undefined) return res.status(409).json({ msg: 'token are missing' });
    if (token === '') return res.status(409).json({ msg: 'token field are empty' });
    const session = await USER.findOne({ access_token: token });

    if (session && session.state === true) {
      const id_product = req.params.id;
      var update = req.body;

      const product = await Product.findByIdAndUpdate(id_product, update);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ msg: 'this product does not exist' });
      }
    } else {
      res.status(403).json({
        msg: 'access denied',
        causes: 'Token does not exist or has expired'
      });
    }
  }
};

module.exports = controller;