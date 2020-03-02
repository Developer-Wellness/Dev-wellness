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
    location VARCHAR(255)
);

INSERT INTO events (name, description, location) VALUES ('Color run', 'its like a rave, but running', 'Seattle, WA');

CREATE TABLE userevents (
    id SERIAL PRIMARY KEY,
    user_is INTEGER,
    event_is INTEGER,
    FOREIGN KEY (user_is) REFERENCES users (id) ON DELETE CASCADE, 
    FOREIGN KEY (event_is) REFERENCES events (id) ON DELETE CASCADE

);
