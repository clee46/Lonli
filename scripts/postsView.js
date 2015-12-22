var postsView = {};

var postList = [];  // array of Post objects

postsView.getTemplate = function() {
  $.get('templates/posts.html', function(data, message, xhr) {
    postsView.postTemplate = Handlebars.compile(data);
  });
};

postsView.replyHandler = function() {
  $('.title').click(function(event) {
    event.preventDefault();
    console.log($(this).text());
    // postsView.searchPosts($(this).text());
    $('#new-reply').show();
    $('#new-post').hide();
    $(this).parent().siblings().hide();
    $('#back').show();
    $('#back').click(function(event) {
      console.log('back button clicked');
      $('#back').hide();
      $('.posts').siblings().show();
      $('#new-reply').hide();
      $('#new-post').show();
    });
  });
};
postsView.searchPosts = function(postTitle) {

}
// $('.postBody h2:not(:first-child)').hide();  // hides all posts
// $('.postBody p:not(:nth-child(2))').hide();  // hides all posts
// $('.read-on').on('click', function(event) {
//   event.preventDefault();
//   $(this).siblings('.postBody').find('h2:not(:first-child)').toggle();
//   $(this).siblings('.postBody').find('p:not(:nth-child(2))').toggle();
// });


postsView.show = function(post) {
  var html = postsView.postTemplate(post);
  $('#entries').prepend(html);
  postsView.replyHandler();
};

postsView.pullPost = function() {
  $('#entries').empty();
  forumData.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var temp = new Post(JSON.parse(childSnapshot.val()));
      postsView.show(temp);
      postList.push(temp);
    });
  });
};
