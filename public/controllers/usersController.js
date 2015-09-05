var usersController = function() {

  function all(context) {
    var users;
    data.users.get()
      .then(function(resUsers) {
        users = resUsers;
        return templates.get('users');
      })
      .then(function(template) {
        context.$element().html(template(users));
      });
  }

  function register(context) {
    templates.get('register')
      .then(function(template) {
        context.$element().html(template());

        $('#btn-register').on('click', function() {
          var user = {
            username: $('#tb-reg-username').val(),
            password: $('#tb-reg-pass').val()
          };

          data.users.register(user)
            .then(function() {
              context.redirect('#/');
              document.location.reload(true);
            });
        });
      });
  }

  return {
    all:all, register:register
  };
}();
