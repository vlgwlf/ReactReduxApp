var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
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

//LOCAL DB CONNECTION
//mongoose.connect('mongodb://localhost:27017/bookshop');

//MONGO LAB CONNECTION STRING
mongoose.connect('mongodb://testUser:test@ds149905.mlab.com:49905/bookshop_testeroo')

var Books = require('./models/books.js');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));
//-----------------> CAPTURE USER SESSIONS <-----------------
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2}, // 2 days in milliseconds
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
  //ttl: 2 days * 24 hours * 60 minutes * 60 seconds
}))
// SAVE CART SESSIONS API
app.post('/cart', function(req, res){
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err){
    if(err){
      console.log("CAN'T SAVE SESSION, ERR: ", err);
    }
    res.json(req.session.cart);
  })
})
//GET SESSIONS CART API
app.get('/cart', function(req, res){
  if(typeof req.session.cart !== 'undefined'){
    res.json(req.session.cart);
  }
});

//-----------------> END SESSION SET UP <---------------

//----------->> POST BOOKS API<<--------------
app.post('/books', function(req, res){
  var book = req.body;

  Books.create(book,function(err, books){
    if(err){
      console.log("CAN'T POST BOOKS. ERR: ", err);
    }
    res.json(books);
  })
});

//------>>>> GET BOOKS <<<-----------
app.get('/books', function (req, res){
  Books.find(function(err, books){
    if(err){
      console.log("CAN'T GET BOOKS, ERR: ", err)
    }
    res.json(books);
  })
})

//--------->>>> DELETE BOOKS <<<<----------
app.delete('/books/:_id', function(req, res){
  var query = {_id:req.params._id};

  Books.remove(query, function (err, books){
    if(err){
      console.log("COULD NOT DELETE BOOK, ERR: ", err);
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
        console.log("COULD NOT UPDATE BOOK, ERR: ", err);
      }
      res.json(books);
    })
})

// --------->>> GET BOOK IMAGES API <<<-------------
app.get('/images', function(req, res){
  const imgFolder = __dirname + '/public/images/';
  //Require filesystem
  const fs = require('fs');
  //Read all files in the directory
  fs.readdir(imgFolder, function(err, files){
    if(err){
      return console.error(err);
    }
    //CREATE AN EMPTY ARRAY
    const filesArr = [];
    //Iterate over all images in the directory
    files.forEach(function(file){
      filesArr.push({name: file});
    })
    //Return JSON response with array of images
    res.json(filesArr);
  })
})

// END APIs
app.listen(3001, function(err){
  if(err){
    return console.log(err);
  }
  console.log('API Server is listening on http://localhost:3001');
})
