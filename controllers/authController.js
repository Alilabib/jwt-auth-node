const User = require('../models/User');
const jwt = require('jsonwebtoken');
const handleErrors = (err) => {
    //console.log(err.message, err.code);
    let errors = { email: '', password: '' };
    //validation errors 
    if (err.code === 11000) {
        errors.email = 'This email is already Taken';
        return errors;
    }
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });

    }
    return errors;
}

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, 'Ali Labib 1', {
        expiresIn: maxAge
    });
}

module.exports.signup_get = async(req, res) => {
    res.render('signup');
}
module.exports.signup_post = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        const Token = createToken(user._id);
        res.cookie('jwt', Token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}
module.exports.login_get = async(req, res) => {
    res.render('login');
}
module.exports.login_post = async(req, res) => {

    const { email, password } = req.body;
    console.log(email, password);
    res.send('user login');
}