var eventsController = (function() {
  function all(context) {
    var events;
    var category = this.params.category || null;
    data.events.get()
      .then(function(resEvents) {
        events = _.chain(resEvents)
          .map(controllerHelpers.fixDate)
          .groupBy(controllerHelpers.groupByCategory)
          .map(controllerHelpers.parseGroups).value();

        if (category) {
          events = events.filter(controllerHelpers.filterByCategory(category));
        }

        return templates.get('events');
      })
      .then(function(template) {
        context.$element().html(template(events));
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  function add(context) {
    templates.get('event-add')
      .then(function(template) {
        context.$element().html(template());
        return data.categories.get();
      })
      .then(function(categories) {
        $('#tb-event-category').autocomplete({
          source: categories
        });

        $('#tb-event-date').datepicker();

        $('#btn-event-add').on('click', function() {

          var event = {
            title: $('#tb-event-title').val(),
            category: $('#tb-event-category').val(),
            description: $('#tb-event-description').val(),
            date: $('#tb-event-date').val()
          };

          data.events.add(event)
            .then(function(event) {
              context.redirect(`#/events?=${event.category}`);
            });
        });
      });
  }

  return {
    all, add
  };

}());
