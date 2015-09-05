var express = require('express'),
  idGenerator = require('../utils/id-generator')();

require('../polyfills/array');

module.exports = function(db) {
  var router = express.Router();

  router.get('/', function(req, res) {
      var user = req.user;
      if (!user) {
        res.status(401)
          .json('Not authorized User');
        return;
      }

      var now = new Date();
      var indicesToRemove = [];
      user.events = user.events || [];

      user.events.forEach(function(event, index) {
        var date = new Date(event.date);
        if (date - now <= 0) {
          indicesToRemove.push(index);
        }
      });

      indicesToRemove.forEach(function(indexToRemove) {
        user.events.splice(indexToRemove, 1);
      });
      db.save();

      user.events.sort(function(e1, e2) {
        return new Date(e1.date) - new Date(e2.date);
      });

      res.json({
        result: user.events
      });
    })
    .post('/', function(req, res) {
      var user = req.user;
      if (!user) {
        res.status(401)
          .json('Not authorized User');
        return;
      }
      var event = {
        id: idGenerator.next(),
        title: req.body.title,
        category: req.body.category || 'uncategorized',
        description: req.body.description,
        date: new Date(req.body.date)
      };
      user.events = user.events || [];

      user.events.push(event);

      res.status(201)
        .json({
          result: event
        });
    });
  return router;
};
