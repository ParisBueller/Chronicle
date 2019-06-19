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
    async (acessToken, refreshToken , profile , done) => {
        console.log(profile.emails[0].value);
        const googleUser = await User.findOne({ googleId: profile.id});
        const existingUser = await User.findOne({ email: profile.emails[0].value})
        if (googleUser) {
            return done(null, googleUser)
            } else if( existingUser ) {
                await User.findOneAndUpdate({ googleId: profile.id})
                return done(null, existingUser);
            } else {
                const newGoogleUser = await new User({googleId: profile.id, email: profile.emails[0].value }).save()
                return done(null, newGoogleUser);
            }

        }           
    )
);

passport.use(
    new GitHubStrategy({
        clientID: keys.githubClientID,
        clientSecret: keys.githubClientSecret,
        callbackURL: '/auth/github/callback'
    },
    async (accessToken, refreshToken ,profile, done) => {          
        console.log(profile.emails[0].value);
        try{
            const githubUser = await User.findOne({ githubId: profile.id});
            const existingUser = await User.findOne({email: profile.emails[0].value});
            if(githubUser) {
                return done(null, githubUser);
            } else if(existingUser) {
                await User.findOneAndUpdate({githubId: profile.id});
                return done(null, existingUser);
            } else {
                const newGithubUser = await new User({ githubId: profile.id, email: profile.emails[0].value }).save()
                return done(null, newGithubUser);
            } 
            }catch(err) {
                console.log(err);
                return null;
            }         
        }        
    )
);



