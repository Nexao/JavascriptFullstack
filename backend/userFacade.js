

var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
var url = 'mongodb://127.0.0.1/users'
var bcrypt = require("bcrypt")


function setURL(newURL){
    url = newURL
}

function createNewUser(username, password, callback){
    // hashing and salting the password
    let hash = bcrypt.hashSync(password,10) // 10 is rounds use when creating a salt!
    MongoClient.connect(url, function(err,db){
        assert.equal(null,err)
        assert.ok(db != null)

        db.collection("users").insertOne({username:username, password:hash}, function(err,data){
            assert.equal(null,err)
            var result = data.ops[0]
            callback(result)
        })
    })
}

function findUserByName(username,callback){
    MongoClient.connect(url,function(err,db){
        assert.equal(null,err)
        assert.ok(db != null)

        db.collection("users").findOne({username:username}, function(err,data){
            assert.equal(null,err)
            
        })
    })
}

function login(username,password,callback){
    MongoClient.connect(url,function(err,db){
        assert.equal(null,err)
        assert.ok(db != null)

        db.collection("users").findOne({username:username}, function(err,data){
            if(data == null){
             callback({user:null, succes:false})
             return
            }
            
        }) 
    })
}



var userFacade = {
    setURL: setURL,
    createNewUser : createNewUser,
    login : login,
    findUserByName: findUserByName
}

module.exports = userFacade