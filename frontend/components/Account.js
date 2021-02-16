import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import * as ReactBootStrap from 'react-bootstrap'




const Account = (props) => {

  const userId = props.match.params.id
  const [accountData, setAccountData] = useState({})
  const [watchlist, setWatchlist] = useState([])
  const [loaded, setLoaded] = useState(false)


  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then((resp) => {
        setAccountData(resp.data)
        getWatchlist(resp.data.watchlist)
      })
  }, [])

  async function getWatchlist(coins) {

    const watchlist = []

    for (let i = 0; i < coins.length; i++) {
      let coin = axios.get(`https://api.coingecko.com/api/v3/coins/${coins[i]}`)

      watchlist.push(coin)
    }

    let res = await axios.all(watchlist)

    const userCoins = []

    res.forEach((coin) => {
      userCoins.push(coin.data)
    })
    setWatchlist(userCoins)
    setLoaded(true)
  }


  return <div className="container-crypto">

    {!loaded ? <div className="loader"><ReactBootStrap.Spinner className="spinner" animation="grow" /></div> :


      <div className="user-info" >
        <Fade>

          <div className="account-panel">
            <img className="profile-picture" src={accountData.image} />
            <h1 className="username" >{accountData.username}</h1>
            <Link to={`/users/${userId}/edit`} className="btn btn-secondary btn-md btn-custom">Update Details</Link>
          </div>


          <div className="container-coins-account container-coins-desk">

            <h1 className={accountData.watchlist.length > 0 ? 'watchlist-heading' : 'watchlist-heading-query'} >{accountData.watchlist.length > 0 ? 'Watchlist' : 'Your watched crypto will appear here'}</h1>


            {watchlist.map((coin, index) => {

              return <Link to={`/crypto/${coin.id}`} key={index}>
                <div className={index % 2 === 0 ? 'coin-single coin-single-desk coin-single-account' : 'coin-single coin-single-desk coin-single-account coin-variable-bg'} >

                  <div className="coin-info">
                    <img className="coin-image" src={coin.image.large} />
                    <p className="coin-name">{coin.name}<br /><span className="coin-symbol">{coin.symbol}</span></p>
                  </div>

                  <div className="coin-market">

                    <div className="res-change-account">
                      <p className={coin.market_data.price_change_percentage_24h > 0 ? 'coin-change-account' : 'coin-change-account-red'}>{coin.market_data.price_change_percentage_24h}%</p>
                    </div>

                    <div className="res-price-account">
                      <p className="coin-price-account">${Math.round((coin.market_data.current_price.usd + Number.EPSILON) * 100) / 100}</p>
                    </div>

                  </div>

                </div>

              </Link>
            })}


          </div>

        </Fade>

      </div>}

    <div className="spacer"></div>


  </div >

}

export default Account

