const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy([
        '/auth/google', 
        '/auth/github', 
        '/register', 
        '/login',
        '/current_user'],
        { target: 'http://localhost:5000'}));
}