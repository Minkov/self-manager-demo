var controllerHelpers = function() {
  function groupByCategory(item) {
    return item.category;
  }

  function parseGroups(items, category) {
    return {
      category,
      items
    };
  }

  function filterByCategory(category) {
    return function(group) {
      return group.category.toLowerCase() === category.toLowerCase();
    };
  }

  function _fixDate(event) {
    return {
      title: event.title,
      date: moment(event.date).format('MMM Do YYYY, hh:mm'),
      timeRemaining: moment(event.date).fromNow(),
      description: event.description,
      category: event.category
    };
  }

  function fixDate(item) {
    var newItem = Object.create(item);
    newItem.date = moment(item.date).format('MMM Do YYYY, hh:mm');
    newItem.timeRemaining = moment(item.date).fromNow();
    return newItem;
    // return {
    //   title: event.title,
    //   date: moment(event.date).format('MMM Do YYYY, hh:mm'),
    //   timeRemaining: moment(event.date).fromNow(),
    //   description: event.description,
    //   category: event.category
    // };
  }

  return {
    groupByCategory, parseGroups, filterByCategory, fixDate
  };
}();
