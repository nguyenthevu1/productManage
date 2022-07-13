const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        email: { type: String, require: true },
        username: { type: String, require: true },
        password: { type: String, require: true },
    },
    { timestamps: true },
);

module.exports = mongoose.model('User', UserSchema);
