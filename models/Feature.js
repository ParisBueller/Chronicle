const mongoose = require('mongoose');
const { Schema } = mongoose;

const featureSchema = new Schema({
    name: String,
    createdAt: Date,
    status: {
        type: String,     
        toDo: {type:Boolean, default: true},
        inProgress: {type:Boolean, default: false},
        complete: {type:Boolean, default: false}
    }
});

module.exports = featureSchema;