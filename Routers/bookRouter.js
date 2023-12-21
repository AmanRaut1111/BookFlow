const express = require('express');
const { addBook, getAllBook, updateBookDetail, deleteBook } = require('../controller/bookController');


const bookRouter = express.Router();


bookRouter.post('/add', addBook);
bookRouter.get('/getAllBook', getAllBook);

bookRouter.put('/update/:id', updateBookDetail)

bookRouter.delete('/delete/:id', deleteBook)


module.exports = bookRouter