const express = require('express');
const router = express.Router();

const { body } = require("express-validator");
const userController = require('../controllers/user.controller'); // Correct capitalization

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars long')
], userController.registerUser); // Ensure this function exists in the controller

module.exports = router;
