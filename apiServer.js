var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');
var Books = require('./models/books.js');

//----------->> POST BOOKS API<<--------------
app.post('/books', function(req, res){
  var book = req.body;

  Books.create(book,function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  })
});

//------>>>> GET BOOKS <<<-----------
app.get('/books', function (req, res){
  Books.find(function(err, books){
    if(err){
      throw err
    }
    res.json(books);
  })
})

//--------->>>> DELETE BOOKS <<<<----------
app.delete('/books/:_id', function(req, res){
  var query = {_id:req.params._id};

  Books.remove(query, function (err, books){
    if(err){
      throw err;
    }
    res.json(books);
  })
})

//---------->>> UPDATE BOOKS <<<----------
app.put('/books/:_id', function(req, res){
  var book = req.body;
  var query = req.params._id;
  //IF the field doesn't exist, '$set' will create a new field
  var update = {
    '$set':{
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };
    //When true, return the updated doc.
    var options = {new: true};

    Books.findOneAndUpdate(query, update, options, function(err, books){
      if(err){
        throw err;
      }
      res.json(books);
    })
})
// END APIs
app.listen(3001, function(err){
  if(err){
    return console.log(err);
  }
  console.log('API Server is listening on http://localhost:3001');
})
