import React from "react"

export default class NewBook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      book: { title: "", info: "", moreInfo: "" }
    };
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const target = event.target
    var book = {}
    book.id = book.id
    book.title = target.title.value
    book.info = target.info.value
    book.moreInfo = target.moreInfo.value
    this.props.route.bookStore.addBook(book)
  }

render() {
    return (
      <div>
        <form style={{ marginTop: 50 }} onSubmit={this.handleSubmit} >
          <div className="row">
            <div className="col-sm-2" >
            <h3>Add new book (^.^) </h3>
              <p>Title:</p>
            </div>
            <div className="col-sm-4">
              <input type="text" id="title" />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2">
              <p>Info:</p>
            </div>
            <div className="col-sm-4">
              <input type="text" id="info" />
            </div>
            <div className="row">
            <div className="col-sm-2">
              <p>MoreInfo:</p>
            </div>
            <div className="col-sm-4">
              <input type="text" id="moreInfo" />
            </div>
            </div>
          </div>
          <button className="btn">Save</button>
        </form>
      </div>
    )
  }
}