const express = require('express');
const Router = require('express').Router;
const { json } = require('body-parser')
const router = new Router();


module.exports = function bookRoutes(db) {

  const books = db.collection('books');

  router
    .get('/', (req, res) => {
      const { body } = req;
      books.find(body).toArray((err, docs) => {
        res.json(docs)
      })
    })

  router
    .post('/', (req, res) => {
      const { body } = req
      books.insert(body, (err, docs) => {
        if (err) return console.log(err);
        res.status(201).json(docs);
      })
  })

  router
    .put('/:title/:author', (req, res) => {
      const { body } = req;
      books.findOneAndUpdate(req.params,body, (err, docs) => {
        if (err) return console.log(err);
        res.json(docs);
    })
  })

  router
    .delete('/', (req, res) => {
      const { body } = req;
      books.findOneAndDelete(body, (err, docs) => {
        if (err) return console.log(err);
        res.json(docs);
    })
  })

  return router

}
