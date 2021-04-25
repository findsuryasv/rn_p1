const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: 'Name is a required input'
    },
    image: {
        type: String,
        required: 'Image is a required input',
          },
});

const model = mongoose.model('category', categorySchema);
module.exports = model;