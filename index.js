'use strict'
const cors = require('cors');
const authRoutes = require('./src/routes/auth.routes');
const express = require('express');
const properties = require('./config/properties');

const DB = require('./config/db');

//init DB
DB();

const app = express();
const router = express.Router();

//contextualizamos al servidor de recibir un json
app.use(express.json());

authRoutes(router);

app.use(cors());
app.use('/api', router);

router.get('/', (req, res) => {
    res.send('Hello from home');
});

app.use(router);
app.listen(properties.PORT, () => console.log(`Server running on port ${properties.PORT}`));

