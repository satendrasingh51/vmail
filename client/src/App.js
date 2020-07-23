import React, { Fragment, Component } from 'react'
import Header from './components/Header';
import { BrowserRouter, Route } from 'react-router-dom'
import Routing from './routers/Routing';

import '../node_modules/popper.js';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Header />
          <Route component={Routing} />
        </Fragment>
      </BrowserRouter>
    )
  }

}

export default App
