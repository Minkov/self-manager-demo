var express = require('express'),
  idGenerator = require('../utils/id-generator')();

module.exports = function(db) {
  var router = express.Router();

  router.get('/', function(req, res) {
    var user = req.user;
    if (!user) {
      res.status(401)
        .json('Not authorized User');
      return;
    }

    var page = +(req.query.page || 0),
      size = +(req.query.size || 10);

    var friendsIds = user.friends || [];

    var friends = db('users').filter(function(dbUser) {
        return friendsIds.indexOf(dbUser.id) >= 0;
      })
      .slice(page * size, size);
    res.json({
      result: friends
    });
  }).post('/:id', function(req, res) {
    var user = req.user;
    if (!user) {
      res.status(401)
        .json('Not authorized User');
      return;
    }
    var userId = req.params.id;

    var userToSendFriendRequest = db('users').find({
      id: userId
    });
    var friendRequests = user.friendRequests || [];
  });
  return router;
};
