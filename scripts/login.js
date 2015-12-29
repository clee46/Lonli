var login = {};
var ref = new Firebase('https://brilliant-fire-1757.firebaseio.com/');
var usersRef = ref.child('users');      // references to users database
var currentUserId = '';
var currentUsername = '';
var isReply = false;
var uidHolder = '';

login.fillUser = function() {
  if (currentUserId !== '') { // if logged in, set current username, hide post author
    usersRef.child(currentUserId).once('value', function(snapshot) {
      currentUsername = snapshot.val().username;
      $('#author').attr('placeholder', currentUsername);
      $('#replyAuthor').attr('placeholder', currentUsername);
    });
    $('#author').prop('readonly', true);
    $('#replyAuthor').prop('readonly', true);
  }
  else {  // if not logged in, allow user to post using any username they want
    $('#author').removeAttr('placeholder');
    $('#replyAuthor').removeAttr('placeholder');
    $('#author').prop('readonly', false);
    $('#replyAuthor').prop('readonly', false);
  }
};
login.persistAuth = function() {
  var authData = ref.getAuth();
  if (authData) {
    console.log('Authenticated user with id:', authData.uid);
    login.fillUser();
    login.authHandler(null, authData);
  }
};
login.authHandler = function(error, authData) {
  if (error) {
    alert('Login Failed!', error);
  } else {
    console.log('Authenticated successfully with payload:', authData);
    $('#login-logout').text('Logout');
    $('#existing-user')[0].reset();
    $('#login-status').empty().append('<p>Logged in as: ' + authData.password.email + '<p>');
    currentUserId = authData.uid;
    moodData.getData();
    if (window.location.href === 'https://lonli.herokuapp.com/' || window.location.href === 'http://lonli.herokuapp.com/') {
      page('/forum');
    }
  }
};
login.showNewLogin = function() {
  $(document).off('click', '#create-btn').on('click', '#create-btn', function(e) {
    e.preventDefault();
    var email = $('#newEmail').val();
    var password = $('#newPass').val();
    var username = $('#newUser').val();

    ref.createUser({email: email, password: password}, function(error, userData) {
      if (error) {
        switch (error.code) {
        case 'EMAIL_TAKEN':
          alert('The new user account cannot be created because the email is already in use.');
          break;
        case 'INVALID_EMAIL':
          alert('The specified email is not a valid email.');
          break;
        default:
          alert('Error creating user:', error);
        }
      } else {
        console.log('Successfully created user account with uid:', userData.uid);
        $('#login-logout').text('Logout');
        $('#new-user')[0].reset();
        $('#login-status').empty().append('<p>Logged in as: ' + email + '<p>');
        usersRef.child(userData.uid).set({
          // moodChartData: [],
          username: username,
          password: password,
          name: email.replace(/@.*/, '')
        });
        currentUserId = userData.uid;
        moodData.getData();
        page('/forum');
      }
    });
  });
};
login.showReturnLogin = function() {
  $(document).off('click', '#login-btn').on('click', '#login-btn', function(e) {
    e.preventDefault();
    var username = $('#existUser').val();
    var password = $('#existPass').val();
    ref.authWithPassword({
      email    : username,
      password : password
    }, login.authHandler);
  });
};
