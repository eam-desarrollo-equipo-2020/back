const mongoose = require('mongoose');
const sessionSchema = require('../models/session.model');

sessionSchema.statics = {
    create: function(data, cb){
        const session = new this(data);
        session.save(cb);
    },
    read: function(query, cb){
        this.find(query, cb);
    }
}

const authModel = mongoose.model('session', sessionSchema);
module.exports = authModel;