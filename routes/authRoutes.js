const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

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

    app.get('/login', (req, res) => {
        res.send();
    })

    app.get('/register', (req, res) => {
        
    })
    //Register New User
    app.post('/register', (req, res) => {
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
            const existingUser = User.findOne({ email: email});
            if (existingUser) {
                errors.push({ msg: 'Email is already registered'});
                res.send({
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User ({name, email, password});

                bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then( user => {
                            res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));
                    })
                )
            }
        }
    });

    app.post('/login', (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/users/login',
            failureFlash: true
        })(req,res,next);
    });

    app.get('/logout', (req, res) => {
        req.logout();
        req.redirect('/users/login');
    });

    app.get('/current_user', (req, res) => {
        res.send(req.user);
    });
    
}