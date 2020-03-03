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

  let sqlSearch = 'SELECT * FROM events WHERE search_query=$1;';
  let safeValues = [city];

  client.query(sqlSearch, safeValues)
    .then(results => {
      if (results.rowCount > 0) {
        response.send(results.rows)

      }else{
        superagent.get(url)
          .then(results =>{

            let racesResults = results.race;
            let raceEvents = racesResults.map((obj) => (new Races(obj)))
            let { name, next_date, location, external_race_url, logo_url } = raceEvents;
            let safeValues2 = [name, next_date, location, external_race_url, logo_url, ];
            let SQL = 'INSERT INTO events (name, description, location, date, logo_url, website) VALUES ($1, $2, $3, $4, $5) RETURNING *;';

            client.query(SQL, safeValues2);

            response.send(raceEvents);
            console.log(raceEvents, '💊');
          });
      }
    });
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


//  "races": [
//         {
//             "race": {
//                 "race_id": 48851,
//                 "name": "2020 Tenacious Ten",
//                 "last_date": "04/20/2019",
//                 "last_end_date": "04/20/2019",
//                 "next_date": "04/11/2020",
//                 "next_end_date": "04/11/2020",
//                 "is_draft_race": "F",
//                 "is_private_race": "F",
//                 "is_registration_open": "T",
//                 "created": "6/19/2017 15:03",
//                 "last_modified": "2/20/2020 13:49",
//                 "description": "
// Join Snohomish Running Company, nuun electrolyte drink and Lululemon for the fourth annual Tenacious Ten! Both the 10k and 10 mile distances will start and finish at Gas Works Park in Seattle, WA, and enjoy views of Lake Union, the Space Needle, and the Seattle skyline.

// ",
//                 "url": "https://runsignup.com/Race/WA/Seattle/TenaciousTen",
//                 "external_race_url": "http://thetenaciousten.com",
//                 "external_results_url": null,
//                 "fb_page_id": null,
//                 "fb_event_id": null,
//                 "address": {
//                     "street": "2101 N. Northlake Way",
//                     "street2": null,
//                     "city": "Seattle",
//                     "state": "WA",
//                     "zipcode": "98103",
//                     "country_code": "US"
//                 },
//                 "timezone": "America/Los_Angeles",
//                 "logo_url": "https://d368g9lw5ileu7.cloudfront.net/races/race48851-logo.bDu4Lw.png",
//                 "real_time_notifications_enabled": "F"
//             }

