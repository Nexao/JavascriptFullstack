

var userFacade = require("./../userFacade")
var expect = require("chai").expect
var testdata = require("./data")
var testURL = 'mongodb://127.0.0.1/users'


describe('usertests',function(){


var user1 = {
    userId : "Hans",
    password: "GreteErSød"
}

before(function(done){
    expect(testdata).to.not.equal(null)
    done()
})

beforeEach(function(done){
    userFacade.setURL(testURL)
    baseState(function(bool){
        expect(bool).to.be.equal(true)
        done()
    })
})


describe('createNewUser + Login', function(){
    it('Insert and new User and Login', function(done){
        userFacade.createNewUser("myNewUser","123pass",function(response){
            expect(response._id).to.exist
            userFacade.login("myNewUser","123pass",function(response){
                expect(response.succes).to.be.equal(true)
                done()
            })
        })
    })
})




function baseState(callback){
    var MongoClient = require('mongodb').MongoClient
    MongoClient.connect(testURL,function(err,db){
        var collection = db.collection('users')
        collection.drop(function(err,replay){
            db.close()
            insertTestData(callback)
        })
    })
}

function insertTestData(callback){
    userFacade.createNewUser(user1.userId,user1.password,function(response){
        expect(response._id).to.exist
        callback(true)
    })
}

})