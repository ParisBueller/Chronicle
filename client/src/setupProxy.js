const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/auth/google', { target: 'http://localhost:5000'}));
    app.use(proxy('/auth/github', { target: 'http://localhost:5000'}));
    app.use(proxy('/api/*', { target: 'http://localhost:5000'}));
    app.use(proxy('/api/features/*', { target: 'http://localhost:5000'}));
    app.use(proxy('/api/projects/*', { target: 'http://localhost:5000'}));
    app.use(proxy('/api/keys', { target: 'http://localhost:5000'}));       
};