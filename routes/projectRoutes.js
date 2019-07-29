const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');

const Project = mongoose.model('project');

module.exports = app => {

    app.get('/api/projects', requireLogin, async (req, res) => {
        const projects = await Project.find({ _user: req.user.id })
        res.send(projects);
    });

    app.post('/api/projects', requireLogin, async (req, res) => {
        const { name, description, repo} = req.body;

        const project = new Project({
            name,
            description,
            _user: req.user.id,
            dateCreated: Date.now(),
            repo
        });
        try{
            await project.save();
            res.send(project);
        } catch (err) {
            res.status(422);
        }

    });    
};

