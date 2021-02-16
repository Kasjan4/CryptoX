import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import * as ReactBootStrap from 'react-bootstrap'


const Crypto = () => {

  const [crypto, setCrypto] = useState([])
  const [currency, setCurrency] = useState('USD')
  const [filter, setFilter] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [pages, setPages] = useState([-1, 0, 1, 2, 3])

  const currencySymbols = {
    GBP: '£',
    EUR: '€',
    USD: '$'
  }

  useEffect(() => {

    try {
      axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&${filter}&per_page=20&page=${pages[2]}&sparkline=false`)
        .then(resp => {
          setCrypto(resp.data)
          scrollToTop()
          setLoaded(true)
        })

    } catch (e) {
      console.log(e)
    }

  }, [currency, filter, pages])

  function handleCurrency(event) {
    setLoaded(false)
    setCurrency(event.target.value)
  }
  function handleMarketCap(event) {
    setLoaded(false)
    setFilter(event.target.value)
  }
  function handleVolume(event) {
    setLoaded(false)
    setFilter(event.target.value)
  }
  function handlePage(event) {
    setLoaded(false)
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
  function abbreviateNumber(value) {
    var newValue = value
    if (value >= 1000) {
      var suffixes = ['', 'K', 'M', 'B', 'T']
      var suffixNum = Math.floor(('' + value).length / 3)
      var shortValue = ''
      for (var precision = 2; precision >= 1; precision--) {
        shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision))
        var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '')
        if (dotLessShortValue.length <= 2) {
          break
        }
      }
      if (shortValue % 1 !== 0) shortValue = shortValue.toFixed(1)
      newValue = shortValue + suffixes[suffixNum]
    }
    return newValue
  }



  return <div className="container-crypto">

    <div className="container-filter-coins">

      <select onChange={handleCurrency} className="filter-currency">
        <option defaultValue>USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>

      <select onChange={handleVolume} className="filter-currency">
        <option defaultValue hidden>Total volume</option>
        <option disabled>Total volume</option>
        <option value="order=volume_desc">Descending</option>
        <option value="order=volume_asc">Ascending</option>
      </select>

      <select onChange={handleMarketCap} className="filter-currency">
        <option defaultValue hidden>Market cap</option>
        <option disabled>Market cap</option>
        <option value="order=market_cap_desc">Descending</option>
        <option value="order=market_cap_asc">Ascending</option>
      </select>


    </div>

    {!loaded ? <div className="loader"><ReactBootStrap.Spinner className="spinner" animation="grow" /></div> :

      <div className="container-coins" id="scroll-to-top">
        <Fade>

          <div className="stat-headings">

            <div className="stats-spacer"></div>


            <div className="stats-wrapper">
              <div className="stat-volume">
                <p className="stat-title" >T/V</p>
              </div>
              <div className="stat-mc">
                <p className="stat-title" >M/C</p>
              </div>
              <div className="stat-change">
                <p className="stat-title" >Change<span className="stat-title-small">(24H)</span></p>
              </div>
              <div className="stat-price">
                <p className="stat-title" >Price</p>
              </div>
            </div>
          </div>

          {crypto.map((coin, index) => {

            return <Link className="coin-single-container" to={`/crypto/${coin.id}`} key={index}>
              <div className={index % 2 === 0 ? 'coin-single coin-single-desk' : 'coin-single coin-single-desk coin-variable-bg'} >

                <div className="coin-info">
                  <img className="coin-image" src={coin.image} />
                  <p className="coin-name">{coin.name}<br /><span className="coin-symbol">{coin.symbol}</span></p>
                </div>

                <div className="coin-market">

                  <div className="res-volume">
                    <p>{currencySymbols[currency]}{abbreviateNumber(coin.total_volume)}</p>
                  </div>

                  <div className="res-mc">
                    <p>{currencySymbols[currency]}{abbreviateNumber(coin.market_cap)}</p>
                  </div>

                  <div className="res-change">
                    <p className={crypto[index].price_change_percentage_24h > 0 ? 'coin-change' : 'coin-change-red'}>{coin.price_change_percentage_24h}%</p>

                  </div>

                  <div className="res-price">
                    <p className="coin-price">{currencySymbols[currency]}{Math.round((coin.current_price + Number.EPSILON) * 100) / 100}</p>
                  </div>



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

      </div>
    }

    <div className="spacer"></div>






  </div >



}

export default Crypto