const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userControllers.js')
const router = express.Router()

function isLoggedin(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('info', 'You must be logged in to view this page')
    res.redirect('/login')
}

router.get('/', userController.home);
router.get('/signup', userController.getsignup);
router.post('/signup', userController.postsignup);
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);
router.get('/logout', userController.logout)
router.get('/users/:username', isLoggedin, userController.profile)
router.get('/edit', isLoggedin, userController.getedit)
router.post('/edit', isLoggedin, userController.postedit)





module.exports = router;