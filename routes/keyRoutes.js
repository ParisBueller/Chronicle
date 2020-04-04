const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');

const Key = mongoose.model('key');

module.exports = app => {
    app.get('/api/keys/:id', requireLogin, async (req, res) => {
        const keys = await Key.find({ _project: req.params.id});
        res.send(keys);
    })

    app.post('/api/keys', requireLogin, async (req, res) => {
        const { name, key, projectId } = req.body;
        const keys = new Key({
            name,
            key, 
            _project: projectId
        });
        try {
            await keys.save();
            res.send(keys);
        } catch(err) {
            res.send(err);
            res.status(422);
        }
    })

    app.delete('/api/keys/:id', requireLogin, async (req, res) => {
        const id = req.params.id;
        await Key.findByIdAndDelete(id);
        res.send('Key has been deleted!')
    })
}