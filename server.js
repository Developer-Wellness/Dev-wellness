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
app.get('/search', getRaces);
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
  let SQL = 'SELECT * FROM events';

  client.query(SQL)
    .then(results =>{
      let eventResults = results.rows;
      let eventNumbers = eventResults.length;
      response.render('./events', {resultsArray: eventResults, eventNumbers});
    })
    .catch(error =>{
      Error(error, response);
    });
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


function getRaces(request, response){
  let city = request.query.location;
  let url = `https://runsignup.com/Rest/races?format=json&results_per_page=12&city=${city}`;

  let sqlSearch = 'SELECT * FROM events WHERE name=$1;';
  let safeValues = [city];

  client.query(sqlSearch, safeValues)
    .then(results => {
        // console.log(results, '✈️');
      if (results.rowCount > 0) {
        response.send(results.rows)

      }else{
        superagent.get(url)
          .then(results =>{

            let racesResults = results.body.races;
            console.log(racesResults, '🤓');
            let raceEvents = racesResults.map((obj) => (new Races(obj)))
            raceEvents.forEach((selectedRace)=>{
            let { name, next_date, location, external_race_url, logo_url, description} = selectedRace;
            let safeValues2 = [name, description, location, next_date, logo_url, external_race_url];
            let SQL = 'INSERT INTO events (name, description, location, date, logo_url, website) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';

console.log(SQL, safeValues, '🤯');
            client.query(SQL, safeValues2);
            })

            let xyz = raceEvents.length;
            response.render('./events', { resultsArray: raceEvents, xyz });
            // console.log(raceEvents, '💊');
          });
      }
    });
}


function Races(obj){
  this.name = obj.race.name;
  this.next_date = obj.race.next_date;
  this.location = obj.race.address.city || 'undefined';
  this.external_race_url = obj.race.external_race_url || 'unavailable';
  this.logo_url = obj.race.logo_url;
  this.description = obj.race.description;    
};

client.connect()
  .then(()=>{
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
  });
