var controller = {};


controller.login = function() {

  $('#login-logout').text('Login');
  $('#login-status').empty().append('<p>You are not logged in.</p>');
  ref.unauth();
  currentUserId = '';
  currentUsername = '';
  $('canvas').remove();

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
};

controller.forum = function() {
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
  $('#login-tab').hide();
  $('#forum-tab').show();
  $('#mood-tab').hide();
  $('#resources-tab').hide();
  $('#new-post').show();      // show new post form
  $('#new-reply').hide();     // hide reply form
  $('#back').hide();          // hide back button
  $('#loadMore').show();
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
