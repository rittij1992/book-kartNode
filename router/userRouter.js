const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/:id', userController.getUser);
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.post('/logout', userController.logoutUser);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;