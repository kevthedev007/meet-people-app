const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/users.js')

const userController = {
    //main page of the app
    home: function(req, res) {
        User.find({}, (err, users) => {
            if(err) throw err
            res.render('home', {users: users})
        })
    },
    //signup page
    getsignup: function(req, res) {
        res.render('signup')
    },

    postsignup: function(req, res) {
        let username = req.body.username;
        User.findOne({username: username}, (err, user) => {
            if(err) throw error
            if(user) {
                req.flash('error', 'username already taken');
               return res.redirect('/signup')
            }
            let newUser = new User({username: username})
            User.register(newUser, req.body.password, (err, user) => {
                if(err) {
                  return res.render('signup')
                }
            passport.authenticate('local')(req, res, function() {
                res.redirect('/')
            })
            })
        })
    },

    getLogin: function(req, res) {
        res.render('login')
    },

    postLogin: function(req, res) {
        passport.authenticate('local')(req, res, function() {
            res.redirect('/')
        })
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/')
    },

    profile: function(req, res) {
        User.findOne({username: req.params.username}, (err, user) => {
            if(err) throw err;
            if(!user) {
                return next(404)
            }
            res.render('profile', {user:user})
        })
    },

    getedit: function(req, res) {
        res.render('edit')
    },

    postedit: function(req, res) {
        req.user.displayName = req.body.displayName;
        req.user.bio = req.body.bio;
        req.user.save((err) => {
            if(err) {
                next(err);
                return
            }
            req.flash('info', 'profile updated');
            res.redirect('/edit')
        })
    }
}



module.exports = userController;