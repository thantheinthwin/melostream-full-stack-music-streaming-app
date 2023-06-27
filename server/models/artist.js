const mongoose = require('mongoose');

const artistSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
            required: true,
        },
        soundcloud: {
            type: String
        },
        youtube: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('artist', artistSchema);