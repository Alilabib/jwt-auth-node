const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please Enter an Email'],
        unique: [true, 'This Email Already Taken'],
        lowercase: true,
        validate: [isEmail, 'please Enter A valid email']
    },
    password: {
        type: String,
        required: [true, 'Please Enter an Password'],
        minlength: [6, 'Please Enter At least 6 characters']
    }
});

// fire a function after doc saved to db  Mongoose Hooks 
userSchema.post('save', function(doc, next) {
    console.log('new user Created & saved ', doc);
    next();
});

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    console.log('user About to be created & saved', this);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;