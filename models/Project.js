const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
    name: String,
    description: String,
    _user: { type: Schema.Types.ObjectId, ref: 'User'},
    dateCreated: Date,
    repo: String
})

mongoose.model('project', projectSchema); 