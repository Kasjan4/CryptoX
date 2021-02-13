import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/style.css'


import SignIn from './components/SignIn'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import Crypto from './components/Crypto'
import Coin from './components/Coin'
import Account from './components/Account'
import UpdateAccount from './components/UpdateAccount'


const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>

      <Route exact path="/" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/crypto" component={Crypto} />
      <Route exact path="/crypto/:ticker" component={Coin} />
      <Route exact path="/users/:id" component={Account} />
      <Route exact path="/users/:id/edit" component={UpdateAccount} />


    </Switch>
  </BrowserRouter>
)

export default App