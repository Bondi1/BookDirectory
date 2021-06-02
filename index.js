const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");
const books = require('./routes/bookRoutes');
const bodyParser = require('body-parser');

// create application/json parser
var jsonParser = express.json();
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = express.urlencoded({ extended: false });

mongoose.connect('mongodb://localhost/bookDirectory',{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use('/api/books', books);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to the port ${port}`));