const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const comparePasswords = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
};

exports.login = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try{
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

exports.register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User with this email already exists.' });
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // Return the created user along with the token
        res.status(201).json({ success: true, message: 'Registration successful', user: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

const sanitizeUser = (user) => {
    const { _id, firstName, lastName, email } = user;
    return { _id, firstName, lastName, email };
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    
        // Compare the entered password with the hashed password
        const passwordMatch = await comparePasswords(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    
        // Generate a JWT token
        const token = generateToken(user._id);
    
        // Return the sanitized user and token in the response
        res.status(200).json({ success: true, message: 'Login successful', user: sanitizeUser(user), token });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};
