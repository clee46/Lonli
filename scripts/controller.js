var controller = {};


controller.login = function() {

  $('#login-logout').text('Login');
  $('#login-status').empty().append('<p>You are not logged in.</p>');
  ref.unauth();
  currentUserId = '';
  console.log('preparing to remove canvas');
  $('canvas').remove();
  console.log('canvas removed!');

  $('#login-tab').show();
  $('#forum-tab').hide();
  $('#mood-tab').hide();
  $('#resources-tab').hide();
  login.showReturnLogin();              // by default, show return user form

  $('#new-btn').on('click', function() {
    $('#new-user').show();
    $('#existing-user').hide();
    $('#existing-prompt').show();
    $('#new-prompt').hide();
    login.showNewLogin();
  });

  $('#existing-btn').on('click', function() {
    $('#new-user').hide();
    $('#existing-user').show();
    $('#new-prompt').show();
    $('#existing-prompt').hide();
    login.showReturnLogin();
  });
  // var isNewUser = true;
  // ref.onAuth(function(authData) {
  //   if (authData && isNewUser) {
  //     // save the user's profile into the database so we can list users,
  //     // use them in Security and Firebase Rules, and show profiles
  //     var chartRef = ref.child('users').child(authData.uid).moodChartData;
  //     // forumData.child('users').child(authData.uid).set({
  //     //   moodChartData: [],
  //     //   password: authData.provider,
  //     //   name: authData.password.email.replace(/@.*/, '')
  //     // });
  //     // forumData.child('users').child(authData.uid).push({moodChartData: []});
  //   }
  // });
};

controller.forum = function() {
  $('#login-tab').hide();
  $('#forum-tab').show();
  $('#mood-tab').hide();
  $('#resources-tab').hide();
  $('#new-reply').hide();     // hide reply forum
  $('#back').hide();          // hide back button
  postsView.getTemplate();    // get post template
  repliesView.getTemplate();  // get reply template
  Post.pullPost();            // fetch most recent forum data from Firebase
  Post.newPost();             // assign event handler for creating new post
  postsView.filterHandler();
  postsView.loadMore();
};

controller.mood = function() {
  $('#login-tab').hide();
  $('#forum-tab').hide();
  $('#mood-tab').show();
  $('#resources-tab').hide();
  // moodData.loadData();
  // moodData.getData();
  if (currentUserId !== '') {
    moodView.makeChart();
    moodView.makeChart();
  }
};

controller.resources = function() {
  $('#login-tab').hide();
  $('#forum-tab').hide();
  $('#mood-tab').hide();
  $('#resources-tab').show();
  resourcesView.filterHandler();
};

// $(function() {
//   // moodData.loadData();
//   moodData.getData();
// });
