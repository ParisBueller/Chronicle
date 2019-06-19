const passport = require('passport');

module.exports = app => {
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
            res.redirect('/projects');
        }
    );

    app.get(
        '/auth/github',
        passport.authenticate('github', {
            scope: [ 'user:email']
        })
    );

    app.get(
        '/auth/github/callback',
        passport.authenticate('github'),
        (req, res) => {
            res.redirect('/projects')
        }
    );
    
}