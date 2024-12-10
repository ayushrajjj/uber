const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password } = req.body;

    // Hash the password
    const hashedPassword = await userModel.hashPassword(password);

    // Create user
    const user = await userService.createUser({
        firstname,
        lastname,
        email,
        password: hashedPassword
    });

    // Generate auth token
    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
};
