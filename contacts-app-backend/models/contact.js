const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {
        mobile: {type: String, required: true},
        work: {type: String}
    },
});

module.exports = mongoose.model('Contact', contactSchema);
