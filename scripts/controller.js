var controller = {};

controller.forum = function() {
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
  $('#forum-tab').hide();
  $('#mood-tab').show();
  $('#resources-tab').hide();
  moodData.loadData();
  moodData.getData();
};

controller.resources = function() {
  $('#forum-tab').hide();
  $('#mood-tab').hide();
  $('#resources-tab').show();
  resourcesView.filterHandler();
};
