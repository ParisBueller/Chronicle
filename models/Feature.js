const mongoose = require('mongoose');
const { Schema } = mongoose;

const featureSchema = new Schema({
    name: String,
    designation: String,
    createdAt: Date,  
    toDo: {type:Boolean, default: true },
    complete: {type:Boolean, default: false },
    _project: {type: Schema.Types.ObjectId, ref: 'Project'}
});

mongoose.model('feature', featureSchema);