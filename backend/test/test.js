var db = require("./../db")
var expect = require("chai").expect
var booksData = require("./data")
var url = 'mongodb://127.0.0.1/booksDB'

describe('bookTest', function(){

before(function(done){
    expect(booksData).to.not.equal(null)
    done()
})

beforeEach(function(done){
    db.setURL(url)
    baseState(function(bool){
        expect(bool).to.be.equal(true)
        done()
    })
})


describe('insertBook',function(){
    it('should save and return the book inserted', function(done){
        var insertedBook = {title:"Book Test", info:"how to insert book", moreInfo:""}
        db.addBook(insertedBook,function(data){
            expect(data.id).to.be.above(0)
            done()
        })
    })
})

describe('readAll', function(){
    it('should read all books', function(done){
        db.getBooks(function(data){
            expect(data.length).to.be.equal(3)
            expect(data[0].title).to.be.equal("How to Learn ES6")
            done()
        })
    })
})

describe('editBook', function(){
    var newTitle = "New Book Title"
    var newMoreInfo = "Wanna know more?"
    it('edit a book', (done) =>{
        db.getBooks(function(tempData){
            tempData[0].title = newTitle
            tempData[0].moreInfo = newMoreInfo
            db.updateBook(tempData[0],(data) =>{
                expect(data.title).to.equal(newTitle)
                expect(data.moreInfo).to.equal(newMoreInfo)
                done()
            })
        })
    })
})

describe('deleteBook', function(){
    it('delete books', function(done){
        db.getBooks(function(tempData){
            var bookId = tempData[0].id
            db.deleteBook(bookId, (data)=>{
                expect(data.deletedCount).to.be.equal(1)
                done()
            })
        })
    })
})


function baseState(callback){
    var MongoClient = require('mongodb').MongoClient
    MongoClient.connect(url,function(err,db){
        var collection = db.collection('books')
        collection.drop(function(err,replay){
            db.close()
            insertTestData(callback)
        })
    })
}

function insertTestData(callback){
    var itemsProcessed = 0
    booksData.data.forEach(function(element) {
      db.addBook(element, function(){
        itemsProcessed++
        if(itemsProcessed == booksData.data.length) callback(true)
      }) 
    })
}
})