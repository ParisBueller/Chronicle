const mongoose = require('mongoose');
const { Schema } = mongoose;

const FeatureSchema = require('./Feature');

const projectSchema = new Schema({
    name: String,
    description: String,
    features: [FeatureSchema],
    _user: { type: Schema.Types.ObjectId, ref: 'User'},
    dateCreated: Date,
    repo: String
})

mongoose.model('project', projectSchema);