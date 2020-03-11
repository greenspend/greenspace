const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 6

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, required: true, lowercase: true, unique: true},
    password: String,
    address: String,
}, {
    timestamps: true
})

userSchema.set('toJSON', {
    transform: function(doc, ret) {
        //removing password from json format
        delete ret.password
        return ret
    }
})

userSchema.pre('save', function(next) {
    const user = this
    if(!user.isModified('password')) return next()
    bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
        if (err) return cb(err)
        cb(null, isMatch)
    })
})

userSchema.methods.comparePassword = function(tryPassword, cb) {
    bcrypt.compare(tryPassword, this.password, function(err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('User', userSchema)