const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    createdAt: {type: Date, default: Date.now},
    displayName: String,
    bio: String
})

userSchema.methods.name = function() {
    return this.displayName || this.username
}

userSchema.plugin(passportLocalMongoose);

let User = mongoose.model('User', userSchema);

module.exports = User;