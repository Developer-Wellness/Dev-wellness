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
app.get('/nutrition-and-wellness', renderNutritionAndWellness);
app.get('/events', renderEvents);
app.get('/mystuff', renderMystuff);
app.get('/aboutUs', renderAboutus);

const PORT = process.env.PORT || 3001;


function renderHomePage(request, response){
  console.log('hello');

  response.render('./index.ejs');
  
}

function renderNutritionAndWellness(request, response) {
  console.log('trying to render nutrition and wellness');
  response.render('./nutrition-and-wellness');
}

function renderEvents(request, response) {
  console.log('trying to render events');
  response.render('./events');
}

function renderMystuff(request, response) {
  console.log('trying to render mystuff');
  response.render('./mystuff');
}

function renderAboutus(request, response) {
  console.log.apply('trying to render aboutUs');
  response.render('./aboutUs');
}

function Error(error, response){
  console.error(error);
  return response.status(500).send('ya done f**kd up A A Ron.');
}


app.get('/search', getRaces);

function getRaces(request, response){
  let city = request.query.location;
  let url = `https://runsignup.com/Rest/races?format=json&results_per_page=12&city=${city}`;
  superagent.get(url)
  .then(results =>{
      console.log(results.body.races[0].race.address, '🎁');
    let racesResults = results.body.races;
    let raceEvents = racesResults.map((obj) => (new Races(obj)))
    console.log(raceEvents, '💊');
    response.send(raceEvents);
  })
  
}

function Races(obj){
  this.name = obj.race.name;
  this.next_date = obj.race.next_date;
  this.location = obj.race.address.city || 'undefined';
  this.external_race_url = obj.race.external_race_url;
  this.logo_url = obj.race.logo_url;    
};

client.connect()
.then(()=>{
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
});

