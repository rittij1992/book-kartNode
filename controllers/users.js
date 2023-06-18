const users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const { name, emailId, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new users({
            name,
            emailId,
            password: hashPassword
        })
        const data = await user.save();
        res.status(200).json({
            message: 'User registered successfully',
            data
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await users.findOne({ emailId });
        if (!user) {
            return res.status(404).json({ message: 'email id or password invalid' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ message: 'email id or password invalid' });
        }
        const token = jwt.sign({ userId: user._id, userEmail: user.emailId },
            'I love books',
            { expiresIn: 36000 });

        res.status(200).json({
            message: 'User login successful',
            token
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await users.findById({ userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json({ message: 'User found', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const { name, emailId, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await users.findOneAndUpdate(req.userId,
            { name, emailId, password: hashedPassword });
        res.status(200).json({
            message: 'User update successful',
            user
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await users.findOneAndDelete(req.userId);
        res.status(200).json({
            message: 'User deleted successfully',
            user
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.logoutUser = async (req, res) => {
    try {
        jwt.destroy(req.userId);
        res.status(200).json({
            message: 'User logout successful'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};