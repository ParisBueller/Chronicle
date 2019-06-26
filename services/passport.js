const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
        console.log(profile.name);
        const name = profile.name.givenName + " " + profile.name.familyName;
        console.log(name);
        const googleUser = await User.findOne({ googleId: profile.id});
        const existingUser = await User.findOne({ email: profile.emails[0].value, name:name});
        if (googleUser) {
            return done(null, googleUser)
            } else if( existingUser ) {
                await User.findOneAndUpdate({ googleId: profile.id})
                return done(null, existingUser);
            } else {
                const newGoogleUser = await new User({googleId: profile.id, email: profile.emails[0].value, name: name }).save()
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
        console.log(profile.displayName);
        try{
            const githubUser = await User.findOne({ githubId: profile.id});
            const existingUser = await User.findOne({email: profile.emails[0].value, name: profile.displayName});
            if(githubUser) {
                return done(null, githubUser);
            } else if(existingUser) {
                await User.findOneAndUpdate({githubId: profile.id});
                return done(null, existingUser);
            } else {
                const newGithubUser = await new User({ githubId: profile.id, email: profile.emails[0].value, name: profile.displayName }).save()
                return done(null, newGithubUser);
            } 
            }catch(err) {
                console.log(err);
                return null;
            }         
        }        
    )
);

passport.use(
    new LocalStrategy({
        usernameField: 'email'
    },
    async (email, password, done) => {
        const existingUser = await User.findOne({ email: email });
        if(!existingUser) {
            return done(null, false)
        }

        bcrypt.compare(password, existingUser.password, (err, isMatch) => {
            if(err) throw err;
            console.log(err);
            if(isMatch) {
                return done(null, existingUser);
            } else {
                console.log('Password is incorrect');
                return done(null, false);                
                }
            })
        }
    )
)



