import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Fade from 'react-reveal/Fade'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'


const Navbar = (props) => {

  const token = localStorage.getItem('token')
  const logo = <FontAwesomeIcon icon={faCoins} size="2x" />

  if (token) {
    const parsedToken = JSON.parse(atob(token.split('.')[1]))
    console.log(parsedToken)
    var userId = parsedToken.sub
  }

  function handleLogout() {
    localStorage.removeItem('token')
    props.history.push('/')
  }

  return <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">

    <div className="nav-logo">{logo} CryptoX</div>

    <button className="navbar-toggler custom-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarResponsive">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse text-right" id="navbarResponsive">
      <ul className="navbar-nav ml-auto">

        {token && <li className="nav-item">
          <Link to="/crypto" className="nav-link">Crypto</Link>
        </li>}

        {token && <li className="nav-item">
          <Link to={`/users/${userId}`} className="nav-link">Account</Link>
        </li>}

        {!token && <li className="nav-item">
          <Link to="/signup" className="nav-link">Sign Up</Link>
        </li>}

        {!token && <li className="nav-item">
          <Link to="/" className="nav-link">Sign in</Link>
        </li>}



        {token && <li className="nav-item">
          <Link to="/" className="nav-link nav-contact"
            onClick={handleLogout}
          >Logout</Link>
        </li>}

      </ul>

    </div>


  </nav>










}


export default withRouter(Navbar)