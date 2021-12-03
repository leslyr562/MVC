const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3004;
const hbs = exphbs.create({ });

// const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

//This code sets up an Express.js session
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};


//This code connects the session to our Sequelize database.
app.use(session(sess));

// const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//express middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//adding folder through express.static middleware gets connect and serves as static assets
app.use(express.static(path.join(__dirname, 'public')));


//turn on routes
app.use(require('./controllers'));


//turn on connection to db and server 
sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
