const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');

const Project = mongoose.model('project');

module.exports = app => {

    app.get('/api/projects', requireLogin, async (req, res) => {
        const projects = await Project.find({ _user: req.user.id })
        res.send(projects);
    });
    
}

