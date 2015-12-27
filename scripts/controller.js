var controller = {};


controller.login = function() {
  $('#login-tab').show();
  $('#forum-tab').hide();
  $('#mood-tab').hide();
  $('#resources-tab').hide();
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

  moodView.makeChart();
  moodView.makeChart();
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
