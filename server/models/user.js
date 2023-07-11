const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
    },
    user_id: {
        type: String,
    },
    email_verified: {
        type: Boolean,
    },
    ph_number: {
        type: String,
    },
    likedSongs: {
        type: Array,
    },
    role: {
        type: String,
        required: true,
    },
    subscription: {
        type: Boolean,
        required: true,
    },
    auth_time: {
        type: String,
        required: true,
    }
}, 
{timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);