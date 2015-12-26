var login = {};
var ref = new Firebase('https://brilliant-fire-1757.firebaseio.com/');
// ref.onAuth(function(authData) {
//   if (authData && isNewUser) {
//     // save the user's profile into the database so we can list users,
//     // use them in Security and Firebase Rules, and show profiles
//     ref.child('users').child(authData.uid).set({
//       provider: authData.provider,
//       name: getName(authData)
//     });
//   }
// });

login.authHandler = function(error, authData) {
  if (error) {
    console.log('Login Failed!', error);
  } else {
    console.log('Authenticated successfully with payload:', authData);
  }
};
login.showNewLogin = function() {
  $(document).off('click', '#create-btn').on('click', '#create-btn', function(e) {
    e.preventDefault();
    var username = $('#newUser').val();
    var password = $('#newPass').val();
    console.log('New user: ' + username + ' , password: ' + password);

    ref.createUser({email: username, password: password}, function(error, userData) {
      if (error) {
        switch (error.code) {
        case 'EMAIL_TAKEN':
          console.log('The new user account cannot be created because the email is already in use.');
          break;
        case 'INVALID_EMAIL':
          console.log('The specified email is not a valid email.');
          break;
        default:
          console.log('Error creating user:', error);
        }
      } else {
        console.log('Successfully created user account with uid:', userData.uid);
        // use page.js to route to forum page or mood tracker
      }
    });
  });
};
login.showReturnLogin = function() {
  $(document).off('click', '#login-btn').on('click', '#login-btn', function(e) {
    e.preventDefault();
    console.log('clicked button for login!');
    var username = $('#existUser').val();
    var password = $('#existPass').val();
    console.log('Return user: ' + username + ' , password: ' + password);
    ref.authWithPassword({
      email    : username,
      password : password
    }, login.authHandler);
  });
};

$(function() {
  login.showReturnLogin();
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
