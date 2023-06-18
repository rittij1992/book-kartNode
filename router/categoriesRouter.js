const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');


router.get('/', categoriesController.getCategories);
router.get('/:id', categoriesController.getCategory);
router.post('/addcategory', categoriesController.addCategory);
router.put('/updatecategory/:id', categoriesController.updateCategory);
router.delete('/deletecategory/:id', categoriesController.deleteCategory);

module.exports = router;