import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import Slide from 'react-reveal/Slide'
import * as ReactBootStrap from 'react-bootstrap'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'

const Coin = (props) => {

  const token = localStorage.getItem('token')
  const [coin, setCoin] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [accountData, setAccountData] = useState({})
  const [duplicate, setDuplicate] = useState(true)


  if (token) {
    const parsedToken = JSON.parse(atob(token.split('.')[1]))
    console.log(parsedToken)
    var userId = parsedToken.sub
  }

  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then((resp) => {
        setAccountData(resp.data)
        console.log(resp.data.watchlist, props.match.params.ticker)
        if (!resp.data.watchlist.includes(props.match.params.ticker)) {
          console.log('here')
          setDuplicate(false)
        }
      })
  }, [])

  useEffect(() => {
    try {
      axios.get(`https://api.coingecko.com/api/v3/coins/${props.match.params.ticker}`)
        .then(resp => {
          setCoin(resp.data)
          setLoaded(true)
        })

    } catch (e) {
      console.log(e)
    }
  }, [])

  function handleWatch() {
    const coinId = props.match.params.ticker

    if (!duplicate) {
      axios.post(`/api/users/${userId}/watchlist`, { coinId }, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(resp => {
          const message = resp.data.message
          console.log(message)
          setDuplicate(true)
        })
    }
    else if (duplicate) {

      axios.delete(`/api/users/${userId}/watchlist/delete/${props.match.params.ticker}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(resp => {
          const message = resp.data.message
          console.log(message)
          setDuplicate(false)
        })

    }

  }




  return <div className="container-global-coin crypto-desk">


    {!loaded ? <div className="loader"><ReactBootStrap.Spinner className="spinner" animation="grow" /></div> :

      <div className="coin">
        <div className="coin-upper">

          <img className="coin-image-large" src={coin.image.large} />
          <div className="coin-upper-info">
            <h1 className="coin-heading" >{coin.name} <span>({coin.symbol})</span></h1>
            <br />
            <a href={coin.links.homepage[0]} target="_blank" rel='noreferrer'>{coin.links.homepage[0]}</a>
          </div>



        </div>

        <div className="coin-mid">

          <div className="coin-stats" >

            <div className="coin-perc">
              <p className="coin-perc-type" >24h</p>
              <p className={coin.market_data.price_change_percentage_24h > 0 ? 'coin-perc-green' : 'coin-perc-red'}>{Math.round((coin.market_data.price_change_percentage_24h + Number.EPSILON) * 100) / 100}%</p>
            </div>

            <div className="coin-perc">
              <p className="coin-perc-type" >30d</p>
              <p className={coin.market_data.price_change_percentage_30d > 0 ? 'coin-perc-green' : 'coin-perc-red'}>{Math.round((coin.market_data.price_change_percentage_30d + Number.EPSILON) * 100) / 100}%</p>
            </div>

            <div className="coin-perc">
              <p className="coin-perc-type" >1y</p>
              <p className={coin.market_data.price_change_percentage_1y > 0 ? 'coin-perc-green' : 'coin-perc-red'}>{Math.round((coin.market_data.price_change_percentage_1y + Number.EPSILON) * 100) / 100}%</p>
            </div>

          </div>



          <div className="coin-stats" >

            <div className="coin-perc">
              <p className="coin-perc-type" >Market cap<br />24H</p>
              <p className={coin.market_data.market_cap_change_percentage_24h > 0 ? 'coin-perc-green' : 'coin-perc-red'}>{Math.round((coin.market_data.market_cap_change_percentage_24h + Number.EPSILON) * 100) / 100}%</p>
            </div>

            <div className="coin-perc">
              <p className="coin-perc-type" >Developer<br />score</p>
              <p className={coin.developer_score > 0 ? 'coin-perc-green' : 'coin-perc-red'}>{Math.round((coin.developer_score + Number.EPSILON) * 100) / 100}</p>
            </div>

            <div className="coin-perc">
              <p className="coin-perc-type" >Liquidity<br />score</p>
              <p className={coin.liquidity_score > 0 ? 'coin-perc-green' : 'coin-perc-red'}>{Math.round((coin.liquidity_score + Number.EPSILON) * 100) / 100}</p>
            </div>
          </div>


        </div>

        <div className="coin-lower">
          <div className="coin-desc" dangerouslySetInnerHTML={{ __html: coin.description.en }} />
        </div>

        <div>
          <button onClick={handleWatch} className={duplicate ? 'btn btn-secondary btn-md btn-custom btn-dup' : 'btn btn-secondary btn-md btn-custom'} >{duplicate ? 'Unwatch' : 'Watch'}</button>
        </div>


      </div>}

    <div className="spacer"></div>

  </div >




}

export default Coin