const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const adminschema = mongoose.model('Admin', adminSchema);
module.exports = adminschema;
