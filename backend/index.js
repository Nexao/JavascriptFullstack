var express = require("express")
var app = express()
var port = 7777
var facade = require("./db")
var userFacade = require(`./userFacade`)
var bodyParser = require('body-parser'); // wraps it into json object
var jwt = require("jsonwebtoken");

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = "Secret"

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    try{
    console.log('payload received', jwt_payload);
    userFacade.findUserByName(jwt_payload.userName, function(user){
        if (user) {
        next(null, user);
        } else {
        next(null, false);
        }
      })
    }
    catch(exeption){
        next(null,false)
    }
});

passport.use(strategy);
app.use(passport.initialize());

app.listen(port, function(){
    console.log("Server Started at Port " + port)
})

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/api/books", function(req, res){
    facade.getBooks(function(books){
        res.send( JSON.stringify(books))
    })

app.post("/api/login", function(req,res){
    if(req.body.userName && req.body.password){
    var userName = req.body.userName;
    var password = req.body.password;
  }
  else{
      res.json({message:"Please provide body with userName and password"})
      return
  }
    userFacade.login(userName,password,function(data){
        if(data.succes === false) res.status(401).json({message: "No authentication"})
        else {
            var payload = {userName: data.user.username}
            var token = JWT.sign(payload,jwtOptions.secretOrKey);
            res.json({message: "ok", token:token})
        }
    })
})

app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json("Succesfully gained the secret");
});




app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json("Succesfully gained the secret");
});

app.post("/api/books",passport.authenticate('jwt', { session: false }), function(req,res){
    var book = req.body.book
     facade.addBook(book, function(book){
         res.send(JSON.stringify(book))
     })
    })

app.put("/api/books", passport.authenticate('jwt', { session: false }), function(req,res){
        var book = req.body.book
        facade.updateBook(book, function(updatedBook){
            console.log(updatedBook)
            res.send(JSON.stringify(updatedBook))
        }) 
    })

app.delete("/api/books/:id",passport.authenticate('jwt', { session: false }), function(req,res){
        var bookid = parseInt( req.params.id)
        facade.deleteBook(bookid, function(response){
            res.send(JSON.stringify(response))
        })
    })
})