const mongoose = require('mongoose')
const User = require('./models/users')

const { dbURI } = require('./config/environment')


mongoose.connect(
  dbURI,

  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {

    if (err) return console.log(err)
    console.log('Mongoose connected!')

    mongoose.connection.db.dropDatabase()

      .then(() => {
        return User.create([
          {
            username: 'Admin',
            email: 'admin@admin.com',
            password: 'adminn',
            passwordConfirmation: 'adminn',
            image: 'https://i.imgur.com/uQyt00P.jpg',
            isAdmin: true,
            watchlist: []

          }
        ])
      })

      .then(users => {
        console.log(`${users.length} users have been created`)
        return users
      })


      .catch(err => {
        console.log(err)
      })

      .finally(() => {

        mongoose.connection.close()

      })
  }
)
