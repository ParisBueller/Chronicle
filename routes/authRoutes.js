const passport = require('passport');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = mongoose.model('users');

module.exports = app => {
    //Google Auth
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['https://www.googleapis.com/auth/userinfo.profile',
                    'https://www.googleapis.com/auth/userinfo.email'
                    ]
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/dashboard');
        }
    );
    //Github Auth
    app.get(
        '/auth/github',
        passport.authenticate('github', {
            scope: [ 'read:user','user:email']
        })
    );

    app.get(
        '/auth/github/callback',
        passport.authenticate('github'),
        (req, res) => {
            res.redirect('/dashboard')
        }
    );

    //Register New User
    app.post('/api/register', (req, res) => {
        const { name, email, password, password2 } = req.body;
        let errors = [];

        if (!name || !email || !password || !password2) {
            errors.push({ msg: 'Please fill in all fields'});
            console.log(errors);
        }
        if (password !== password2) {
            errors.push({ msg: 'Passwords do not match'});
            console.log(errors);
        }
        if(password.length < 6) {
            errors.push({msg: 'Password must be at least 6 characters'})
            console.log(errors);
        }
        if (errors.length > 0) {
            res.send({
                errors,
                name,
                email,
                password,
                password2
            });
        } else {
            // const existingUser = 
            User.findOne({ email: email})
                .then( user => {
                    if(user) {
                        errors.push({ msg: 'Email is already registered'});
                        res.send({
                            errors,
                            name,
                            email,
                            password,
                            password2
                        });
                    } else {
                        const newUser = new User({name, email, password});

                        bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then( user => {
                                    res.send(user)
                                    res.redirect('/login')
                                })
                                .catch(err => console.log(err));
                            }))
                    }
                });
            }
    });

    app.post('/api/login', (req, res, next) => {
        passport.authenticate('local', 
            res.send(req.errors)
        )(req,res,next);
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        req.redirect('/login');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
    
}