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
      size = 10,
      notifications = user.notifications || [];

    res.json(notifications.slice(page * size, (page + 1) * size));
  });
  return router;
};
