const mongoose = require('mongoose');
const { Schema } = mongoose;

const keySchema = new Schema({
    name: String,
    key: String,
    _project: {type: Schema.Types.ObjectId, ref: 'Project'}
});

mongoose.model('key', keySchema);