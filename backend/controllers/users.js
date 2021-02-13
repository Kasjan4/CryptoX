const User = require('../models/users')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function getUsers(req, res) {
  User
    .find()
    .populate('user.favourites')
    .then(userList => {
      res.send(userList)
    })
    .catch(error => res.send(error))
}

function createUser(req, res) {
  const body = req.body

  User
    .create(body)
    .then(user => {

      res.send(user)
    })
    .catch(error => res.send(error))

}

function singleUser(req, res) {
  const accountId = req.params.userId


  User
    .findById(accountId)

    .then(account => {

      if (!account) return res.status(404).send({ message: 'User not found' })
      res.send(account)

    })
    .catch(error => res.send(error))
}


function removeUser(req, res) {

  const accountId = req.params.userId
  const currentUser = req.currentUser

  User
    .findById(accountId)
    .then(account => {
      if (!account._id.equals(currentUser._id) && !req.currentUser.isAdmin) {
        return res.status(401).send({ message: 'Unauthorised' })
      }
      account.deleteOne()
      res.status(202).send({ message: 'Success' })
    })
    .catch(error => res.send(error))
}

function modifyUser(req, res) {
  const accountId = req.params.accountId
  const body = req.body

  const currentUser = req.currentUser

  User
    .findById(accountId)
    .then(account => {
      if (!account) return res.send({ message: 'User not found' })
      if (!account._id.equals(currentUser._id)) {
        return res.status(401).send({ message: 'Unauthorised' })
      }
      account.set(body)

      return account.save()
    })
    .then(account => res.send(account))
    .catch(error => res.send(error))
}

function logInUser(req, res) {

  User
    .findOne({ email: req.body.email })
    .then(user => {

      if (!user) {
        res.send({ message: 'User not found' })

        return
      }

      if (!user.validatePassword(req.body.password)) {
        res.send({ message: 'Incorrect password' })

        return
      }

      const token = jwt.sign(
        { sub: user._id },
        secret,
        { expiresIn: '6h' }
      )
      res.status(202).send({ token })

    })

    .catch(error => res.send(error))

}

function addToWatchlist(req, res) {

  const coin = req.body.coinId
  const id = req.currentUser._id

  User
    .findById(id)

    .then(user => {

      if (!user) return res.status(404).send({ message: 'User not found' })

      const containsFavourite = user.watchlist.includes(coin)

      if (containsFavourite) {
        return res.send({ message: `${coin} is already in your watchlist!` })

      } else if (!containsFavourite) {
        user.watchlist.push(coin)
      }

      res.status(202).send({ message: 'Success' })
      return user.save()

    })

    .catch(err => res.send(err))
}

function deleteFromWatchlist(req, res) {

  const coin = req.params.coinId
  const id = req.currentUser._id

  User
    .findById(id)

    .then(user => {

      if (!user) return res.status(404).send({ message: 'User not found' })

      const x = user.watchlist.indexOf(coin)
      user.watchlist.splice(x, 1)

      res.status(202).send({ message: 'Success' })
      return user.save()
    })

    .catch(err => res.send(err))
}

module.exports = {
  createUser,
  logInUser,
  getUsers,
  singleUser,
  removeUser,
  modifyUser,
  addToWatchlist,
  deleteFromWatchlist
}