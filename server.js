'use strict';

////////////Dependencies////////////

const express = require('express');
require('dotenv').config();
const app = express();
const superagent = require('superagent');
const pg = require('pg');
require('ejs');
const methodOveride = require('method-override');

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
app.use(methodOveride('_method'));

app.get('/', renderHomePage);

const PORT = process.env.PORT || 3001;


function renderHomePage(request, response){
  console.log('hello');

  response.render('./index.ejs');
  
}


function Error(error, response){
  console.error(error);
  return response.status(500).send('ya done f**kd up A A Ron.');
}

client.connect()
.then(()=>{
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
});
