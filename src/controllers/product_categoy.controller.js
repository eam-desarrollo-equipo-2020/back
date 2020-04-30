var ProductCategory = require('../dao/product_category.dao');

var controller = {

  createProdCat: function (req, res) {
    var prod_cat = new ProductCategory();
    var params = req.body;
    prod_cat.name = params.name;
    prod_cat.description = params.description;
    USER.findOne({access_token: req.headers.token})
            .then(session => {
                if(session.state){
                    prod_cat.id = session.id_user
                    prod_cat.save((err, prod_catStored) => {
                        if (err) return res.status(500).json({
                            message: 'Error saving prod_cat'
                        });
                        if (!prod_catStored) return res.status(400).json({
                            message: 'Could not save prod_cat'
                        });
                        return res.status(200).json({
                            prod_cat: prod_catStored
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
