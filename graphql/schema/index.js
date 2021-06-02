const { buildSchema } = require("graphql")

module.exports = buildSchema(`

  type Book {
    _id: ID!
    name: String!
    author: String!
    publishedYear: String!
  }


  input BookInput {
    name: String!
    author: String!
  }

  type Query {
    books:[Book!]
  }

  type Mutation {
    createBook(book:BookInput): Book
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)