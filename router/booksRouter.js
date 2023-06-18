const express = require('express');
const router = express.Router();
const bookController = require('../controllers/books');
const {bookCoverUpload} = require('../utility/BookUpload');


router.get('/', bookController.getBooks);
router.get('/writers', bookController.getAllWriters);
router.get('/:id', bookController.getBook);
router.get('/categories/:id', bookController.getBookByCatId);

router.post('/addbook', bookCoverUpload.single('coverImage'), bookController.addBook);
router.put('/updatebook/:id', bookController.updateBook);
router.delete('/deletebook/:id', bookController.deleteBook);


module.exports = router;