
var Order = require('../dao/order.dao');
const USER = require('../dao/session.dao.js');
var controller = {
  createOrder: function (req, res) {

    var { name, client, responsible, total, detail} = req.body;
    var { token } = req.headers;

    if ( token === undefined || token === '') {
      return res.status(409).json({ msg: 'Token are missing' });
    }

    if( name === undefined || client === undefined || responsible === undefined
      || detail === undefined || total === undefined)
      return res.status(409).json({ msg: 'fields are missing' });
  
  if (name === '' || client === '' || responsible === '' || detail === '' 
      || total === '')
      return res.status(409).json({ msg: 'some fields are empty' });

    var order = new Order();
    order.name = name;
    order.client = client;
    order.responsible = responsible;
    order.total = total;
    order.detail = detail;   
    USER.findOne({ access_token: token })
      .then(session => {
        if (session.state) {
          order.id = session.id_user;
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
  findOrderByClient: async (req, res) => {
    const token = req.headers.token;
    if (token === undefined) return res.status(409).json({ msg: 'fields are missing' });
    if (token === '') return res.status(409).json({ msg: 'some fields are empty' });
    const session = await USER.findOne({ access_token: token });

    if (session && session.state === true) {
      const name_customer = req.params.name;

      const order = await Order.find({ "client": { '$regex': name_customer } });

      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ msg: 'Not exist almost a order with this expression' });
      }

    } else {
      res.status(403).json({
        msg: 'access denied',
        causes: 'Token does not exist or has expired'
      });
    }
  }

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