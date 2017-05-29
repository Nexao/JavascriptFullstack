import { observable, useStrict, action } from "mobx"
import axios from "axios"
import Auth from "./Authenticate"
const backendURL = "http://localhost:7777/api/"
const booksURL = `${backendURL}books`

useStrict(true);

//DataStore for this Demo
class BookStore {

  @observable _books = [];

  constructor() {
    this.fetchBooks();
  }

  //get all books
  get books() {
    return this._books;
  }

  //individual books
  getBook(id) {
    // return this._books.filter((book) => {
    //   return book.id === Number(id);
    // })[0];
    if (this._books == null) {
      return null
    }
    var returnBook;
    this._books.forEach((book, index) => {
      if (book._id == id) {
        returnBook = this._books[index]
      }
    })
    console.log("HERE:" + returnBook.title)
    return returnBook;
  }

  @action
  changeBooks(id) {
    this._books.replace(id);
  }
  //   changeBooks = action((books) =>{
  //   this._books = books
  // })


  //edit a book
  editBook(book){
    var config = {
      headers: {'Authorization' : "JWT " + Auth.getToken()}
    }
    if (book.id == null) throw Error("No such book!")
    axios.put(`${backendURL}books`,{book}, config)
    .then((response) =>{
      console.log(response)
      this.fetchBooks()
    })
    .catch((error) =>{
      console.log(error)
    })
    

  }

  
  addBook(book){

    var config = {
      headers: {'Authorization' : "JWT " + Auth.getToken()}
    }

    axios.post(`${backendURL}books`,{book}, config)
      .then((response) =>{
        console.log(response)
        this.fetchBooks()
      })
      .catch((error) =>{
        console.log(error)
      })
    
  }


  //delete a book
  deleteBook(book_id) {
    
    var config = {
      headers: {'Authorization' : "JWT " + Auth.getToken()}
    }

    axios.delete(`${booksURL}/${book_id}`, config)
      .then((response) =>{
        console.log(response)
        this.fetchBooks()
      })
      .catch((error) =>{
        console.log(error)
      })
    }

  //this is asynchronous
  fetchBooks = () => {
    fetch(booksURL)
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        this.changeBooks(response);
        // this._books.replace(response);
        console.log("Got books from server");
      })
  }
}

//this shows how cool MobX is ;)
let store = new BookStore();

//global object in the browser, store has my books array
window.store = store;

export default store;