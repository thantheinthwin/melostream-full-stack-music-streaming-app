const mongoose = require('mongoose');

const songSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
            required: true,
        },
        songURL: {
            type: String,
            required: true,
        },
        album: {
            type: String,
        },
        artist: {
            type: String,
            required: true
        },
        language: {
            type: String
        },
        genre: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('song', songSchema);