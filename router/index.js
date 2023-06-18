const express = require('express');
const Router = express.Router();
const userRouter = require('./userRouter');
const categoriesRouter = require('./categoriesRouter');
const booksRouter = require('./booksRouter');
const articleRouter = require('./articleRouter');

Router.use('/user', userRouter);
Router.use('/categories', categoriesRouter);
Router.use('/books', booksRouter);
Router.use('/articles', articleRouter);

module.exports = Router;