const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(mongoose.Types.ObjectId(id))
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
    new GitHubStrategy({
        clientID: keys.githubClientID,
        clientSecret: keys.githubClientSecret,
        callbackURL: '/auth/github/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
            const githubUser = await User.findOne({ githubId: profile.id })
            if(githubUser) {
                return done(null, githubUser);
            }
            const user = await new User({ githubId: profile.id}).save()
            done(null, user);             
        }
    )
);


