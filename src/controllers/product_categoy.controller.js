var ProductCategory = require('../dao/product_category.dao');

var controller = {

  createProdCat: function (req, res) {
    var prod_cat = new ProductCategory();
    var params = req.body;
    prod_cat.name = params.name;
    prod_cat.description = params.description;
    
    prod_cat.save((err, prodCatStored) => {
      if (err) return res.status(500).json({
        message: 'Error saving product category'
      });
      if (!prodCatStored) return res.status(400).json({
        message: 'Could not save product category'
      });
      return res.status(200).json({
        prod_cat: prodCatStored
      });
    });

  },
};
module.exports = controller;
