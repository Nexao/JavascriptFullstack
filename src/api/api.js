let router = require("express").Router();
var Book = require('../models/Book');

router.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});


//get all books
router.get('/books', function (req, res, next) {
  Book.find({}, function (err, books) {
    if (err) throw err;
    let arr = books
    let j = JSON.stringify(arr);
    res.send(j);
  });
});

//get book by id
router.get('/books/:id', function (req, res, next) {
  Book.findById({ _id: req.params.id }, function (err, book) {
    if (err) throw err;
    let j = JSON.stringify(book);
    res.send(j);
  });
});

//add book 
router.post("/books", function (req, res, next) {
  var book = req.body;
  Book.create(book, function (err, book) {
    if (err) throw err;
    console.log();
    res.json(book);
  })
});

//update book option 2
router.put("/books/:id", function (req, res, next) {
  var id = req.params.id;
  var book = JSON.stringify(req.body);
  Book.findOneAndUpdate({ _id: id }, { book }, function (err, book) {
    if (err) throw err;
    console.log(book);
    res.json(book);
  });
});

//Delete book
router.delete('/books/:id', function (req, res, next) {
  Book.findByIdAndRemove(req.params.id, function (err) {
    if (err) throw err;
    console.log('book successfully removed!');
    res.status(204).send();
  });
});


module.exports = router;