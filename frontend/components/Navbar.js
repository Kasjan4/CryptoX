import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery'
import Fade from 'react-reveal/Fade'


const Navbar = (props) => {

  const token = localStorage.getItem('token')
  const logo = <FontAwesomeIcon icon={faCoins} size="2x" />
  const [upDown, setUpDown] = useState('')
  const [marketStatus, setMarketStatus] = useState('')

  if (token) {
    const parsedToken = JSON.parse(atob(token.split('.')[1]))

    var userId = parsedToken.sub
  }

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/global')
      .then((resp) => {

        setMarketStatus(Math.round((resp.data.data.market_cap_change_percentage_24h_usd + Number.EPSILON) * 100) / 100)

        if (resp.data.data.market_cap_change_percentage_24h_usd >= 0) setUpDown('up')
        else if (resp.data.data.market_cap_change_percentage_24h_usd < 0) setUpDown('down')
      })

  }, [])

  function handleLogout() {
    closeNav()
    localStorage.removeItem('token')
    props.history.push('/')
  }

  function closeNav() {
    $('.navbar-collapse').collapse('hide')
  }

  return <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">

    <div className="nav-logo">{logo} CryptoX</div>

    <Fade appear spy={marketStatus}>
      {marketStatus && <div className="market-status-container">
        <p className="market-status" >Market is {upDown} <span className={marketStatus >= 0 ? 'market-status-green' : 'market-status-red'}>{marketStatus}%</span></p>
      </div>
      }
    </Fade>

    <button className="navbar-toggler custom-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarResponsive">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse text-right" id="navbarResponsive">
      <ul className="navbar-nav ml-auto">

        {token && <li className="nav-item">
          <Link to="/crypto" onClick={closeNav} className="nav-link" >Crypto</Link>
        </li>}

        {token && <li className="nav-item">
          <Link to={`/users/${userId}`} onClick={closeNav} className="nav-link" >Account</Link>
        </li>}

        {!token && <li className="nav-item">
          <Link to="/signup" onClick={closeNav} className="nav-link" >Sign Up</Link>
        </li>}

        {!token && <li className="nav-item">
          <Link to="/" onClick={closeNav} className="nav-link" >Sign in</Link>
        </li>}

        {token && <li className="nav-item">
          <Link to="/" onClick={handleLogout} className="nav-link" >Logout</Link>
        </li>}

      </ul>

    </div>


  </nav >


}


export default withRouter(Navbar)