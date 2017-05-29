import React from "react"
import './models/bookStore'
import { Link } from "react-router"
import {observer} from 'mobx-react' // state management

const Edit = observer(({ bookStore, book }) => {
    function handleSubmit(evt) {
        // event.preventDefault = method cancels the event if it is cancelable, 
        // meaning that the default action that belongs to the event will not occur.                    
        evt.preventDefault()
        const target = evt.target
        var editBook = {}
        editBook.id = book.id
        editBook.title = target.title.value
        editBook.info = target.info.value
        editBook.moreInfo = target.moreInfo.value
        bookStore.editBook(editBook) 
    }

    var title = book.title
    var info = book.info
    var moreInfo = book.moreInfo
    // handleSubmit is called from above, with all the info inside
    return (
        <div className="col-md-6">
            <h3>Edit Your book (^.^) </h3>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text" defaultValue={title}
                        className="form-control" id="title" />

                </div>
                <div className="form-group">
                    <label htmlFor="info">Info</label>
                    <input
                        type="text" defaultValue={info}
                        className="form-control" id="info" />

                </div>
                <div className="form-group">
                    <label htmlFor="moreInfo">More Info</label>
                    <input
                        type="text" defaultValue={moreInfo}
                        className="form-control" id="moreInfo" />
                </div>
                <button type="submit" className="btn">Save</button>
            </form>
        </div>
    )
})

export default Edit