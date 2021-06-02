const express = require('express');
const {Book,validateBook} = require('../models/book');
const bodyparser = require('body-parser');

const router = express.Router();

// create application/json parser
var jsonParser = bodyparser.json();
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyparser.urlencoded({ extended: false });


router.get('/', async (req,res) => {
    const books = await Book.find().sort('name');
    res.send(books);
});

router.get('/:id',async (req,res) => {
   const book = await Book.findById(req.params.id);

    if(!book) return res.status(404).send('The book with given id is not found!');

    res.send(book);
    
});

router.post('/', jsonParser, async(req,res) => {
    console.log('Validating...');
    const {error} = validateBook(req.body); // object destructuring
    if(error) return res.status(400).send(error.details[0].message); // 400 - Bad request
    console.log(req);
    try{
        
        let book = new Book({ name: req.body.name, author: req.body.author, publishedYear: req.body.publishedYear });
        book = await book.save();
        res.send(book);
    }catch(err) {console.error('Error while saving!' + err.message)};
    
})

router.put('/:id', jsonParser, async (req,res) => {
    // validate 
    const result  = validateBook(req.body);
    const {error} = validateBook(req.body); // object destructuring
    //if invalid return 400 error
    if(error) return res.status(400).send(error.details[0].message); // 400 - Bad request
    //update books
    const book = await Book.findByIdAndUpdate(req.params.id, {name: req.body.name, author: req.body.author, publishedYear: req.body.publishedYear }, {new: true});

    if(!book)  return res.status(404).send('The book with given id is not found!');

   // bookToUpdate.book = req.body.book;
    //return updated books
    const books = await Book.find().sort('name');
    res.send(books);
})

router.delete('/:id',jsonParser, async(req,res) => {
    //const bookToUpdate = books.find(g => g.id === parseInt(req.params.id));
    const bookToUpdate = Book.findByIdAndRemove(req.params.id);
    // if not there throw 404 error
    if(!bookToUpdate) return res.status(404).send('The book with given id is not found!');

   // const index = books.indexOf(bookToUpdate);
   // books.splice(index,1);
   console.log(bookToUpdate);
   const books = await Book.find().sort('name');
   res.send(books);
   
})

module.exports = router;