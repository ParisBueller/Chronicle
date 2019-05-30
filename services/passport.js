const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
        proxy: true
    },
    async (acessToken, refreshToken, profile, done) => {
        const googleUser = await User.findOne({ googleId: profile.id })
        if(googleUser) {
            return done(null, googleUser);
        }
        const user = await new User({ googleId: profile.id }).save()
        done(null, user);
        }   
    )
);

passport.use(
    new LocalStrategy(
        async (username, password, done) => {
             await User.findOne({ username: username }, 
                (err, user) => {
                if (err) { return done(err); console.log('error authenticating', err)}
                if (!user) { return done(null, false); (console.log('user not found'))}
                if (!user.verifyPassword(password)) { return done(null, false); (console.log('password is invalid')) }
                return done(null, user, console.log('authenticated', user));
                
            });     
        }
    )
);
