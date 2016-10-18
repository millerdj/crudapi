const express = require('express');
const { json } = require('body-parser');
const bookRoutes = require('./book-routes');

module.exports = function createApp(db) {

  const app = express();
  const books = bookRoutes(db)

  app.use(json());
  app.use('/books', books);

  return app
}
