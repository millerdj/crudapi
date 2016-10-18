const { MongoClient } = require('mongodb');
const createApp = require('../create-app');
const request = require('request');
const chai = require('chai');
const { json } = require('body-parser')
const { expect, assert, should } = chai;

const TEST_URI = 'http://localhost:3000/books';
const TEST_PORT = '3000';
const TEST_DB = 'mongodb://localhost:27017/books';


describe('BOOKS API', () => {

  let db, server

  before(done => {
    //connect to database
    //start server
    MongoClient.connect(TEST_DB, (err, _db) => {
      if (err) return done(err)
      db = _db
      const app = createApp(db);
      server = app.listen(TEST_PORT, () => {
        done()
      })
    })

  })

  after(done => {
    //close db connection
    //closer server
    db.close(true, () => {
      server.close();
      done();
    })

  })

  beforeEach(done => {
    const books = db.collection('books')
    books.remove(err => {
      if (err) return done(err)
      done();
    })
  })

  describe('GET /books', () => {

    it('Retrieves all books from the database', (done) => {
      request.get(TEST_URI, { json: true }, (err, res, body) => {
        expect(err).to.be.null;
        expect(res).to.have.property('statusCode', 200);
        expect(body).to.have.lengthOf(0);
        done();
      })
    })
  })

  describe('POST /books/', () => {

    it('creates a new book', done => {
      const newBook = { title: 'Example9', author: 'SomeGuy'}
      request.post(TEST_URI, { json: newBook }, (err, res, body) => {
        expect(err).to.be.null;
        expect(res).to.have.property('statusCode', 201)
        done();
      })
    })
  })

})
