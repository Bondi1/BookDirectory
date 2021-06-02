const {Book} = require("../../models/book")

module.exports = {
  books: async () => {
    try {
      const booksFetched = await Book.find();
      return booksFetched.map(book => {
        return {
          ...book._doc,
          _id: book.id,
          //createdAt: new Date(book._doc.createdAt).toISOString(),
        }
      })
    } catch (error) {
      throw error
    }
  },

  createBook: async args => {
    try {
      const { name, author, publishedYear } = args.book
      const book = new Book({
        name, author, publishedYear
      })
      const newBook = await book.save()
      return { ...newBook._doc, _id: newBook.id }
    } catch (error) {
      throw error
    }
  },
}