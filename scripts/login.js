var login = {};
var ref = new Firebase('https://brilliant-fire-1757.firebaseio.com/');
var usersRef = ref.child('users');      // references to users database
var currentUserId = '';

login.authHandler = function(error, authData) {
  if (error) {
    console.log('Login Failed!', error);
  } else {
    console.log('Authenticated successfully with payload:', authData);
    currentUserId = authData.uid;
    moodData.getData();
    // page('/forum');
  }
};
login.showNewLogin = function() {
  $(document).off('click', '#create-btn').on('click', '#create-btn', function(e) {
    e.preventDefault();
    var username = $('#newUser').val();
    var password = $('#newPass').val();

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
        usersRef.child(userData.uid).set({
          moodChartData: [],
          password: password,
          name: username.replace(/@.*/, '')
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
