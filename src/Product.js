import React from "react"
import { Link } from "react-router"
//only here import from mobx-react
import { observer } from "mobx-react"
// import NewBook from "./NewBook"

@observer
export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.props.route.bookStore.fetchBooks();
  }
  render() {
    var books = this.props.route.bookStore.books;
    const bookStore = this.props.route.bookStore;
    return (
      <div>
        <h3>All our great books </h3>
        <ul>
          {books.map((book) => <li key={book._id}>
            {book.title} <Link to={`products/details/${book._id}`}> Edit </Link>
            <button onClick={() => bookStore.deleteBook(book.id)}> Remove </button></li>)}
        </ul>
      </div>
    )
  }
}


        // <NewBook bookStore={this.props.route.bookStore}/>