import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Fade from 'react-reveal/Fade'
import Slide from 'react-reveal/Slide'





const SignUp = (props) => {


  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    isAdmin: false,
    image: 'https://i.imgur.com/uQyt00P.jpg'
  })

  const [errors, updateErrors] = useState({
    message: ''
  })

  // const [errors, updateErrors] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  //   passwordConfirmation: '',
  //   isAdmin: false,
  //   image: 'https://i.imgur.com/uQyt00P.jpg'
  // })

  function handleChange(event) {

    const name = event.target.name

    const value = event.target.value

    const data = {
      ...formData,
      [name]: value
    }
    const newErrors = {
      ...errors,
      [name]: ''
    }

    updateFormData(data)
    updateErrors(newErrors)

  }

  function handleSubmit(event) {

    event.preventDefault()

    axios.post('/api/signup', formData)
      .then(resp => {

        if (resp.data.errors) {

          const errorType = resp.data.errors[Object.keys(resp.data.errors)[0]].message
          console.log(resp.data)

          const newErrors = {
            ...errors,
            message: errorType
          }

          updateErrors(newErrors)
        } else {
          props.history.push('/')
        }
      })

  }


  console.log(errors)

  return <div className="container-global">
    <Fade>

      <h1 className="signin-query" >Sign up for your personal <span className="signin-query-bold">Crypto</span> account</h1>

      <form onSubmit={handleSubmit}>

        <div className="form-group text-center">
          <input
            className="form-control"
            placeholder="Username"
            type="text"
            onChange={handleChange}
            value={formData.username}
            name="username"
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-control"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            value={formData.email}
            name="email"
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-control"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            value={formData.password}
            name="password"
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-control"
            placeholder="Confirm Password"
            type="password"
            onChange={handleChange}
            value={formData.passwordConfirmation}
            name="passwordConfirmation"
            required
          />
        </div>

        {errors.message &&
          <Slide up>
            <div className="error-container">
              <p id="error" >
                {errors.message}
              </p>
            </div>
          </Slide>}

        <button className="btn btn-secondary btn-md btn-custom">Sign Up</button>

      </form>

    </Fade>



  </div>



}

export default SignUp