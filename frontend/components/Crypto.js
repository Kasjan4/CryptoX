import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import Slide from 'react-reveal/Slide'
import * as ReactBootStrap from 'react-bootstrap'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins, faVolumeMute } from '@fortawesome/free-solid-svg-icons'

const Crypto = (props) => {

  const token = localStorage.getItem('token')
  const logo = <FontAwesomeIcon icon={faCoins} size="2x" />
  const [crypto, setCrypto] = useState([])
  const [currency, setCurrency] = useState('USD')
  const [marketCap, setMarketCap] = useState('&order=market_cap_desc&')
  const [volume, setVolume] = useState('&order=volume_desc&')
  const [loaded, setLoaded] = useState(false)
  const [pages, setPages] = useState([-1, 0, 1, 2, 3])

  const currencySymbols = {
    GBP: '£',
    EUR: '€',
    USD: '$'
  }

  useEffect(() => {

    try {
      axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}${marketCap}${volume}per_page=20&page=${pages[2]}&sparkline=false`)
        .then(resp => {
          setCrypto(resp.data)
          setLoaded(true)
        })


    } catch (e) {
      console.log(e)
    }

  }, [currency, marketCap, volume, pages])

  function handleCurrency(event) {
    setLoaded(false)
    setCurrency(event.target.value)
  }
  function handleMarketCap(event) {
    setLoaded(false)
    setVolume('')
    setMarketCap(event.target.value)
  }
  function handleVolume(event) {
    setLoaded(false)
    setMarketCap('')
    setVolume(event.target.value)
  }
  function handlePage(event) {
    const newPages = [...pages]
    newPages[0] = Number(event.target.value) - 2
    newPages[1] = Number(event.target.value) - 1
    newPages[2] = Number(event.target.value)
    newPages[3] = Number(event.target.value) + 1
    newPages[4] = Number(event.target.value) + 2
    setPages(newPages)
    scrollToTop()
  }
  function scrollToTop() {
    window.scrollTo(0, 0)
  }



  return <div className="container-crypto">

    <div className="container-filter-coins">

      <select onChange={handleCurrency} className="filter-currency">
        <option defaultValue>USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>

      <select onChange={handleMarketCap} className="filter-currency">
        <option defaultValue hidden>Market cap</option>
        <option disabled>Market cap</option>
        <option value="&order=market_cap_desc&">Descending</option>
        <option value="&order=market_cap_asc&">Ascending</option>
      </select>

      <select onChange={handleVolume} className="filter-currency">
        <option defaultValue hidden>Volume</option>
        <option disabled>Volume</option>
        <option value="&order=volume_desc&">Descending</option>
        <option value="&order=volume_asc&">Ascending</option>
      </select>

    </div>

    {!loaded ? <div className="loader"><ReactBootStrap.Spinner className="spinner" animation="grow" /></div> :

      <div className="container-coins" id="scroll-to-top">
        <Fade>

          {crypto.map((coin, index) => {

            return <Link className="coin-single-container" to={`/crypto/${coin.id}`} key={index}>
              <div className="coin-single coin-single-desk" >

                <div className="coin-info">
                  <img className="coin-image" src={coin.image} />
                  <p className="coin-name">{coin.name}<br /><span className="coin-symbol">{coin.symbol}</span></p>
                </div>

                <div className="coin-market">
                  <p className="coin-price">{currencySymbols[currency]}{Math.round((coin.current_price + Number.EPSILON) * 100) / 100}</p>
                  <p className={crypto[index].price_change_percentage_24h > 0 ? 'coin-change' : 'coin-change-red'}>{coin.price_change_percentage_24h}%</p>

                </div>
              </div>
            </Link>
          })}
        </Fade>

        <Fade appear spy={pages}>
          <div className="container-pages">

            <button hidden={pages[0] < 1 ? true : false} onClick={handlePage} value={pages[0]} className="btn btn-md btn-page">{pages[0]}</button>
            <button hidden={pages[1] < 1 ? true : false} onClick={handlePage} value={pages[1]} className="btn btn-md btn-page">{pages[1]}</button>
            <button onClick={handlePage} value={pages[2]} className="btn btn-md btn-page btn-page-active">{pages[2]}</button>
            <button onClick={handlePage} value={pages[3]} className="btn btn-md btn-page">{pages[3]}</button>
            <button onClick={handlePage} value={pages[4]} className="btn btn-md btn-page">{pages[4]}</button>

          </div>
        </Fade>

      </div>}






  </div>



}

export default Crypto