const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');

const Feature = mongoose.model('feature');

module.exports = app => {
    app.get('/api/features/:id', requireLogin, async (req, res)  => {
        console.log(req.params.id);
        const features = await Feature.find({ _project: req.params.id});
        res.send(features);
    })

    app.post('/api/features', requireLogin, async (req, res) => {
        const { name, designation, projectId } = req.body;
        console.log(req.body);
        const feature = new Feature({
            name,
            designation,
            createdAt: Date.now(),
            toDo: true,
            inProgress: false,
            completed: false,
            _project: projectId
        });
        try {
            await feature.save();
            res.send(feature);
        } catch(err) {
            res.send(err);
            res.status(422);
        }
    })

    app.put('/api/features/:id', requireLogin, async (req, res) => {
        console.log(req.params.id);
        const feature = await Feature.findByIdAndUpdate({_id: req.params.id}, {"$set":{"complete": true, "toDo": false }}, {returnOriginal: false});
        console.log(feature);
        res.send(feature);
    });

    app.delete('/api/features/:id', requireLogin, async (req, res) => {
        console.log(req.params.id);
        const id = req.params.id;
        await Feature.findByIdAndDelete(id);
        res.send('Feature has been deleted!');
    })
}