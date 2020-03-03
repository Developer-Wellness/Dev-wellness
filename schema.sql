DROP TABLE IF EXISTS users, events, userevents;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    password VARCHAR(255)
);

INSERT INTO users (name, password) VALUES ('Sean', '12345');


CREATE TABLE events(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    location VARCHAR(255),
    date VARCHAR(255),
    logo_url VARCHAR(255),
    website VARCHAR(255)
);

INSERT INTO events (name, description, location, date, logo_url, website) VALUES ('Color run', 'its like a rave, but running', 'Seattle, WA', '12 March 2020', 'Image Goes here', 'website goes here');

CREATE TABLE userevents (
    id SERIAL PRIMARY KEY,
    user_is INTEGER,
    event_is INTEGER,
    FOREIGN KEY (user_is) REFERENCES users (id) ON DELETE CASCADE, 
    FOREIGN KEY (event_is) REFERENCES events (id) ON DELETE CASCADE

);
