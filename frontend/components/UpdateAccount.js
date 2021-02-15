import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Fade from 'react-reveal/Fade'



const UpdateAccount = (props) => {

  const id = props.match.params.id
  const token = localStorage.getItem('token')
  const [userData, updateUserData] = useState({})
  const [profilePic, updateProfilePic] = useState('https://i.imgur.com/HsqOaU6.jpg')


  useEffect(() => {
    axios.get(`/api/users/${id}`)
      .then((resp) => {
        const userImage = resp.data.image
        updateUserData(resp.data)
        updateProfilePic(userImage)
      })
  }, [])

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    image: `${profilePic}`
  })

  const [errors, updateErrors] = useState({
    message: ''
  })

  function handleChange(event) {

    const name = event.target.name
    const value = event.target.value

    const data = {
      ...formData,
      [name]: value,
      image: `${profilePic}`
    }

    updateFormData(data)

  }

  function handleUpdate(event) {

    event.preventDefault()

    axios.put(`/api/users/${id}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {

        if (resp.data.message) {
          updateErrors(resp.data)

        } else {
          props.history.push(`/users/${id}`)
        }
      })

  }


  function handlePic(image) {
    updateProfilePic(image)
  }

  function handleDelete() {
    axios.delete(`/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        console.log(res)
        localStorage.removeItem('token')
        props.history.push('/')
      })

  }


  return <div className="container-update-account">
    <Fade>

      <form className="update-desk" onSubmit={handleUpdate}>

        <div className="update-picture">

          <Fade>
            <img onClick={() => handlePic('https://i.imgur.com/uQyt00P.jpg')} className={profilePic === 'https://i.imgur.com/uQyt00P.jpg' ? 'profile-picture-update-active' : 'profile-picture-update'} src="https://i.imgur.com/uQyt00P.jpg" />
          </Fade>

          <Fade delay={200}>
            <img onClick={() => handlePic('https://i.imgur.com/HsqOaU6.jpg')} className={profilePic === 'https://i.imgur.com/HsqOaU6.jpg' ? 'profile-picture-update-active' : 'profile-picture-update'} src="https://i.imgur.com/HsqOaU6.jpg" />
          </Fade>

          <Fade delay={400}>
            <img onClick={() => handlePic('https://i.imgur.com/INLVHkv.jpg')} className={profilePic === 'https://i.imgur.com/INLVHkv.jpg' ? 'profile-picture-update-active' : 'profile-picture-update'} src="https://i.imgur.com/INLVHkv.jpg" />
          </Fade>

        </div>

        <div className="form-group">
          <input
            className="form-control"
            placeholder={userData.username}
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
            placeholder={userData.email}
            type="text"
            onChange={handleChange}
            value={formData.email}
            name="email"
            required
          />

        </div>

        <div className="form-group">
          <input
            className="form-control"
            placeholder="New Password"
            type="Password"
            onChange={handleChange}
            value={formData.password}
            name="password"
            required
          />

        </div>

        <div className="form-group">
          <input
            className="form-control"
            placeholder="Confirm New Password"
            type="password"
            onChange={handleChange}
            value={formData.passwordConfirmation}
            name="passwordConfirmation"
            required
          />

        </div>

        {errors.message &&
          <Fade appear spy={errors}>
            <div className="error-container">
              <p id="error" >
                {errors.message}
              </p>
            </div>
          </Fade>}

        <button className="btn btn-secondary btn-md btn-custom">Update</button>

        <button onClick={handleDelete} className="btn btn-secondary btn-md btn-custom delete-user btn-dup">Close account</button>

      </form>

      <div className="spacer"></div>


    </Fade>
  </div>

}

export default UpdateAccount

