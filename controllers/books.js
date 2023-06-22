const books = require('../models/Book');
// const categories = require('../models/Category');
const { find } = require('../models/users');

exports.getBooks = async (req, res) => {
    try {
        const limit = 3;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;

        let query = {};
        const searchText = req.query.searchText;
        const searchCat = req.query.searchCat;
        const searchWriter = req.query.searchWriter;
        const regex = new RegExp(searchText, "i");


        if (searchText && searchCat && searchWriter) {
            query = { name: { $regex: regex }, category: searchCat, writer: searchWriter }

        } else if (searchText) {
            query = { name: { $regex: regex } }

        } else if (searchCat) {
            query = { category: searchCat }

        } else if (searchWriter) {
            query = { writer: searchWriter }
        }


        const bookCount = await books.countDocuments(query);
        const totalPages = Math.ceil(bookCount / limit);
        const allBooks = await books.find(query)
            .populate({ path: 'category', select: 'categoryName' })
            .skip(offset)
            .limit(limit)
        const allWriter = await books.find().distinct('writer');
        const allBook = await books.find();
        res.status(200).json({
            message: 'Books fetched successfully',
            allBooks,
            allBook,
            allWriter,
            totalPages
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllWriters = async (req, res) => {
    try {
        const allWriter = await books.find().distinct('writer');
        res.status(200).json({
            message: 'All writer fetched successfully',
            allWriter,
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



exports.getBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const bookData = await books.findById(bookId);
        res.status(200).json({ message: 'Book fetched successfully', bookData });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getBookByCatId = async (req, res) => {
    try {
        const bookCatId = req.params.id;
        const allBook = await books.find({ category: bookCatId });
        res.status(200).json({
            message: 'Books fetched by Category',
            allBook
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

/*exports.addBook = async (req, res) => {
    try {
        const { name, writer, release, category } = req.body;
        const coverImage = req.file.path;
        const newBook = new books({ name, coverImage, writer, release, category });
        const addBookData = await newBook.save();
        res.status(200).json({ message: 'Book added successfully', addBookData });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};*/


exports.addBook = async (req, res) => {
    try {
        const { name, writer, release, category } = req.body;
        console.log(name);
        // const coverImage = req.file.path;
        // const newBook = new books({ name, coverImage, writer, release, category });
        // const addBookData = await newBook.save();
        res.status(200).json({ message: 'Book added successfully', });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


exports.updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const { name, writer, release, category } = req.body;
        const updateBook = await books.findByIdAndUpdate(bookId, { name, writer, release, category });
        res.status(200).json({ message: 'Book updated successfully', updateBook });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const bookDelt = await books.findByIdAndDelete(bookId);
        res.status(200).json({ message: 'Book deleted succesfully', bookDelt });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};