'use strict';

////////////Dependencies////////////

const express = require('express');
require('dotenv').config();
const app = express();
const superagent = require('superagent');
const pg = require('pg')

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3001;
client.connect()
.then(()=>{
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
});
