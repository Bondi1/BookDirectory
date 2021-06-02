const Joi = require('joi');
const mongoose = require('mongoose');
const Book = mongoose.model('Book',new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 250
    },
    author: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    publishedYear: Number

}));


function validateBook(book) {
    const schema = Joi.object({
        name : Joi.string().min(5).max(250).required(),
        author : Joi.string().min(5).max(50).required(),
        publishedYear : Joi.number()
      });
    

    return schema.validate(book);
}

exports.Book = Book;
exports.validateBook = validateBook;