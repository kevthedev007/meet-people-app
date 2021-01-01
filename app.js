const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy
const passportLocalMongoose = require('passport-local-mongoose')

//custom modules
const User = require('./models/users.js');
const routes = require('./routes/router.js');

//mongoose connection
mongoose.connect('mongodb://127.0.0.1:27017/meet-people', { useNewUrlParser: true, useUnifiedTopology: true})

//starting express app
const app = express()

//setting view templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// //adding middlewares 
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(session({
    secret: 'kelvinkadiri',
    resave: false,
    saveUninitialized: false,
}))
app.use(flash())

// //passport middlewares
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash('error');
    res.locals.infos = req.flash('info')
    next()
})

app.use('/', routes)

app.listen(3000)