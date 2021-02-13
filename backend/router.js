const express = require('express')
const router = express.Router()
const userController = require('./controllers/users')
const secureRoute = require('./middleware/secureRoute')


router.route('/signup')
  .post(userController.createUser)

router.route('/signin')
  .post(userController.logInUser)

router.route('/users')
  .get(userController.getUsers)

router.route('/users/:userId')
  .get(userController.singleUser)
  .delete(secureRoute, userController.removeUser)
  .put(secureRoute, userController.modifyUser)


router.route('/users/:userId/watchlist')
  .post(secureRoute, userController.addToWatchlist)
router.route('/users/:userId/watchlist/delete/:coinId')
  .delete(secureRoute, userController.deleteFromWatchlist)






module.exports = router