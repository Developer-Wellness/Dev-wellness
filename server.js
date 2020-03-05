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

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(methodOveride('_method'));

app.get('/', renderHomePage);
app.get('/nutrition-and-wellness', renderNutritionAndWellness);
app.get('/events', renderEvents);
app.get('/mystuff', renderMystuff);
app.get('/aboutUs', renderAboutus);
app.get('/search', getRaces);
app.put('/favorite/:event_name', saveOneEvent);
app.post('/userName', createUsername);
app.delete('/favorite/:event_id', deleteOneEvent);
app.put('/updateFavorite/:completed', updateOneEvent);

const PORT = process.env.PORT || 3001;


function createUsername(request, response) {
  //check to see if user is in sql db
  //if user is in db, send their id to local storage and refresh homepage 
  //if user is not in db, create user, send this ID to local storage, then refresh homepage 
  //on page load, check local storage to see if user name exists - if user exists, 'welcome username' on homepage
  let { firstname, lastname } = request.body;
  let safeValues = [firstname, lastname];
  let sql = 'SELECT * FROM users WHERE firstname = $1 and lastname = $2;';
  client.query(sql, safeValues)
    .then((results) => {
      if (results.rows.length > 0) {
        response.render('index', { id: results.rows[0].id, firstName: results.rows[0].firstname, lastName: results.rows[0].lastname });
      } else {
        let sql2 = 'INSERT INTO users (firstname, lastname) VALUES ($1, $2) RETURNING *;';
        let safeValues2 = [firstname, lastname];
        console.log('safeValues2', safeValues2);
        client.query(sql2, safeValues2)
          .then(results => {
            console.log('sql2', results);
            response.render('index', { id: results.rows[0].id, firstName: results.rows[0].firstname, lastName: results.rows[0].lastname });
            console.log('sql2', results)
          })

          .catch(error => {
            Error(error, response);
          });
      }
    })
    .catch(error => {
      Error(error, response);
    });

}


function saveOneEvent(req, res) {
  let eventName = req.params;
  let { name, next_date, location, external_race_url, logo_url, description, completed } = req.body;
  let safeValues2 = [name, description, location, next_date, logo_url, external_race_url, completed]; //UUID, LIBRARY; BCRIPT
  let SQL = 'INSERT INTO events (name, description, location, date, logo_url, website, completed) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;';

  client.query(SQL, safeValues2)
  res.redirect(`/search?location=${locationSearch}`);

}

function deleteOneEvent(request, response){
  let eventId = request.params.event_id
  let SQL = 'DELETE FROM events WHERE id=$1'
  let safeValues = [eventId];

  client.query(SQL, safeValues);
  response.redirect('/mystuff');
}



function updateOneEvent(request, response){
  let eventId = request.params.completed;
  let SQL = 'UPDATE events SET completed=$1 WHERE id=$2;';
  let safeValues = [true, eventId];
  
  client.query(SQL, safeValues);
  response.redirect('/mystuff');

}


function renderHomePage(request, response) {
  console.log('hello');

  response.render('./index.ejs');

}

function renderNutritionAndWellness(request, response) {
  console.log('trying to render nutrition and wellness');
  response.render('./nutrition-and-wellness');
}

function renderEvents(request, response) {
  console.log('trying to render events');
  let eventResults = [];
  response.render('./events', { resultsArray: eventResults});

}

function renderMystuff(request, response) {
  let SQL = 'SELECT * FROM events';

  client.query(SQL)
    .then(results => {
      let eventResults = results.rows;
      let eventNumbers = eventResults.length;
      response.render('./mystuff', { resultsArray: eventResults, eventNumbers });
    })
    .catch(error => {
      Error(error, response);
    });
}

function renderAboutus(request, response) {
  console.log.apply('trying to render aboutUs');
  response.render('./aboutUs');
}

function Error(error, response) {
  console.error(error);
  return response.status(500).send('ya done f**kd up A A Ron.');
}


function getRaces(request, response) {
  let type = request.query.selectEventType;
  let city = request.query.location.toLowerCase();
  let url = `https://runsignup.com/Rest/races?format=json&results_per_page=12&city=${city}&event_type=${type}`;;

  superagent.get(url)
    .then(results => {

      let racesResults = results.body.races;
      let raceEvents = racesResults.map((obj) => (new Races(obj)))
      response.render('./events', { resultsArray: raceEvents });
    });
}

let locationSearch = '';

function Races(obj) {
  this.name =  obj.race.name;
  this.next_date = obj.race.next_date;
  this.location = obj.race.address.city.toLowerCase() || 'undefined';
  this.external_race_url = obj.race.external_race_url || 'unavailable';
  this.logo_url = obj.race.logo_url;
  this.description = obj.race.description;
  this.completed = false;
  locationSearch = this.location;
};

client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
  });
