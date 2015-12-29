var controller = {};

controller.login = function() {
  ref.unauth();
  currentUserId = '';
  currentUsername = '';
  view.showLogin();
  login.showReturnLogin();              // by default, show return user form

  $('#new-btn').on('click', function() {
    view.showNewUserBtn();
    login.showNewLogin();
  });

  $('#existing-btn').on('click', function() {
    view.showExistingUserBtn();
    login.showReturnLogin();
  });
};

controller.forum = function() {
  view.showForum();
  login.fillUser();
  Post.pullPost();            // fetch most recent forum data from Firebase
  $('#' + uidHolder + ' .postedReplies').hide();
  Post.newPost();             // assign event handler for creating new post
  postsView.filterHandler();
  postsView.loadMore();
};

controller.mood = function() {
  view.showMood();
};

controller.resources = function() {
  view.showResources();
  resourcesView.filterHandler();
};

$(function() {
  postsView.getTemplate();    // get post template
  repliesView.getTemplate();  // get reply template
  login.persistAuth();        // on page reload, check if user was logged in
  view.showNav();             // Stick the #nav to the top of the window
});
