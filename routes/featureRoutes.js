const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');

const Feature = mongoose.model('feature');

module.exports = app => {
    app.get('/api/features', requireLogin, async (req, res)  => {
        const features = await Feature.find({ _project: req.project.id});
        res.send(features);
    })

    app.post('/api/features', requireLogin, async (req, res) => {
        const { name, designation } = req.body;

        const feature = new Feature({
            name,
            designation,
            createdAt: Date.now(),
            status: {todo: true},
            _project: req.project.id
        });
        try {
            await feature.save();
            res.send(feature);
        } catch (err) {
            res.status(422);
        }
    })
}