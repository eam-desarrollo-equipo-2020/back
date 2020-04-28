'use strict'
const cors = require('cors');
const authRoutes = require('./src/routes/auth.routes');
const profileRoutes = require('./src/routes/profile.routes');
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

// Middlewares..
app.use(cors());
app.use(morgan('dev'));

app.use('/api', router);

router.get('/', (req, res) => {
    res.send('Hello from home');
});

app.use(router);
app.listen(properties.PORT, () => console.log(`Server running on port ${properties.PORT}`));

