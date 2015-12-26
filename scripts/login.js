var login = {};

login.showNewLogin = function() {
  $('#create-btn').on('click', function() {
    var username = $('#newUser').val();
    var password = $('#newPass').val();
    authClient.createUser(email, password, function(error,  user) {
      if (!error) {
        doLogin(user);
      } else {
        alert(error);
      }
    });
  });
};
login.showReturnLogin = function() {
  $('#login-btn').on('click', function() {
    var username = $('#existUser').val();
    var password = $('#existPass').val();
    authClient.createUser(email, password, function(error,  user) {
      if (!error) {
        doLogin(user);
      } else {
        alert(error);
      }
    });
  });
};

$(function() {
  $('#new-btn').on('click', function() {
    $('#new-user').show();
    $('#existing-user').hide();
    $('#existing-btn').show();
    $('#new-btn').hide();
    login.showNewLogin();
  });
  $('#existing-btn').on('click', function() {
    $('#new-user').hide();
    $('#existing-user').show();
    $('#new-btn').show();
    $('#existing-btn').hide();
    login.showReturnLogin();
  });
});
