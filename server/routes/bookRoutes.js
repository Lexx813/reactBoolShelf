
const mongoose = require('mongoose');
const { Book } = require("../models/book");


module.exports = app => {
// GET 1 BOOK BY ID //
app.get("/api/getBook", (req, res) => {
  let id = req.query.id;

  Book.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  });
});


//GET BOOKS//
app.get("/api/books", (req, res) => {
  // locahost:3001/api/books?skip=3&limit=2&order=asc
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;

  // ORDER = asc || desc
  Book.find()
    .skip(skip)
    .sort({ _id: order })
    .limit(limit)
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
    });
});



// POST //
app.post('/api/book', (req, res) => {
  const book = new Book(req.body)

  book.save((err, doc) => {
    if(err) return res.status(400).send(err);
    res.status(200).json({
      post:true,
      bookId: doc._id
    })
  })
})

// // UPDATE//
app.post("/api/book_update", (req, res) => {
  Book.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json({
      success: true,
      doc
    });
  });
});

// // DELETE //

app.delete("/api/delete_book", (req, res) => {
  let id = req.query.id;

  Book.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json(true);
  });
});








}