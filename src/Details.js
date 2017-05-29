import React from "react"
import {Link} from "react-router"
import EditForm from './Edit'

export default class Details extends React.Component {
  render() {
    const id = this.props.params.id;
    const store = this.props.route.bookStore;
    let book = store.getBook(id);
    console.dir(book)
    return (
      <div>
        <br />
        <EditForm bookStore={this.props.route.bookStore} book={book} />
        <br />
        <br />
        <Link to="/products">Products</Link>
      </div>
    );
  }
}