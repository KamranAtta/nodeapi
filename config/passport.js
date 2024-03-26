const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

module.exports = () => {
    const User = mongoose.model('User');
    passport.use('user', new LocalStrategy({
        usernameField: 'emailAddress',
        passwordField: 'hash'
    }, async (username, password, done) => {
        try {
            console.log('HEREEEEEEEE', username);
            console.log('HEREEEEEEEE222', password);
            const user = await User.findOne({ 'emailAddress': username });
            if (!user) {
                return done(null, false, {
                    message: "Incorrect email."
                });
            }

            if (!user.ValidPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            return done(null, user);
        
        } catch (error) {
            return done(err);
        }
    }));
};