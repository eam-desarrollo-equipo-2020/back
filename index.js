'use strict'
const cors = require('cors');
const authRoutes = require('./src/routes/auth.routes');
const profileRoutes = require('./src/routes/profile.routes');
const user_typeRoutes = require('./src/routes/user_types.routes');
const prodCatRoutes = require('./src/routes/product_category.routes');
const companyRoutes = require('./src/routes/company.routes');
const productRoutes = require('./src/routes/product.routes');
const orderRoutes = require('./src/routes/order.routes');
const customerRoutes = require('./src/routes/customer.routes');
const express = require('express');
const properties = require('./config/properties');
const morgan = require('morgan');

const DB = require('./config/db');

//init DB
DB();

const app = express();
const router = express.Router();

//contextualizamos al servidor de recibir un json
app.use(express.json());

authRoutes(router);
profileRoutes(router);
user_typeRoutes(router);
prodCatRoutes(router);
companyRoutes(router);
productRoutes(router);
orderRoutes(router);
customerRoutes(router);

// Middlewares..
app.use(cors());
app.use(morgan('dev'));

app.use('/api', router);

router.get('/', (req, res) => {
    res.send('Hello from home');
});

app.use(router);
app.listen(properties.PORT, () => console.log(`Server running on port ${properties.PORT}`));