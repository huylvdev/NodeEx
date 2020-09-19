const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var userSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },
    tag: {
        type: Array,
    },
    category: {
        type: Array,
        // default: 'user'
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dateAdded: { type: Date, default: Date.now },
})
const Post = mongoose.model('post', userSchema);

module.exports = Post;