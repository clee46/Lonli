var forumData = new Firebase('https://brilliant-fire-1757.firebaseio.com/');

function Post (opts) {
  Object.keys(opts).forEach(function(e,index,keys) {
    this[e] = opts[e];
  },this);
}
Post.newPost = function() {
  $('#new-post').on('submit', function(e) {
    e.preventDefault();
    var newPost = new Post({
      title: $('#title').val(),
      author: $('#author').val(),
      category: $('#category').val(),
      body: $('#body').val(),
      date: new Date(e.timeStamp),
      gender: $('input[name="gender"]:checked').val(),
      replies: []
    });
    $('#new-post')[0].reset();
    var postString = JSON.stringify(newPost);
    forumData.push(postString);
  });
};
Post.handleValueChange = function(dataSnapshot) {
  $('#entries').empty();
  dataSnapshot.forEach(function(item) {
    postsView.show(new Post(JSON.parse(item.val())));
    // $('#entries').append('UID: ' + item.name() + ': ' + item.val());
  });
  postsView.replyHandler();
};
$(function() {
  $('#new-reply').hide();   // hide reply forum
  $('#back').hide();        // hide back button
  postsView.getTemplate();  // get post template
  Post.newPost();
  $('#entries').empty();
  forumData.on('value', Post.handleValueChange);
  repliesView.getTemplate();
  // postsView.replyHandler();
});
