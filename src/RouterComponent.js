import React from "react";
import {Router,Route, IndexRoute,hashHistory} from "react-router";
import Product from "./Product";
import App from "./App";
import Company from "./Company";
import Blog from "./Blog";
import Details from "./Details";
import Home from "./Home";
import NewBook from "./NewBook";
import Edit from "./Edit";
import loginStatus from "./LoginStatus"
import {observer} from 'mobx-react'

@observer
 export default class RouterComponent extends React.Component {

   constructor(props){
        super(props)
    }
  render() {
    var bookStore = this.props.bookStore
    return (
      <div>
        <Router history={hashHistory}>
          <Route path = "/" component={App}>
            <IndexRoute component = {Home}></IndexRoute>
            <Route path = "products" component={Product}
                   bookStore = {this.props.bookStore}/>
            <Route path = "products/details/:id" component={Details}
                   bookStore = {this.props.bookStore}/>
            <Route path = "products/details/edit/:id" component={Edit}
                   bookStore = {this.props.bookStore}/>
            <Route path = "company" component={Company}/>
            <Route path = "blog" component={Blog}/>
            <Route path = "newbook" component={NewBook} 
                   bookStore={this.props.bookStore}/>
            <li style={{float:"right"}}>LoginStatus</li>       
          </Route>
        </Router>
      </div>
    );
  }
}