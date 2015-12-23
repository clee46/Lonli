var forumData = new Firebase('https://brilliant-fire-1757.firebaseio.com/');
var postList = [];

function Post (opts) {
  console.log('Post called');
  Object.keys(opts).forEach(function(e,index,keys) {
    this[e] = opts[e];
  },this);
  this.id = postList.length + 1;
  postList.push(this);
}
Post.newPost = function() {
  console.log('newPost called');
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
    var postString = JSON.stringify(newPost);
    forumData.push(postString);
    Post.pullPost();
  });
};
Post.pullPost = function() {
  console.log('pullPost called');
  postList = [];    // reset the postList
  $('#entries').empty();
  forumData.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var uid = childSnapshot.key();
      var temp = new Post(JSON.parse(childSnapshot.val()));
      postsView.show(temp, uid);
    });
  });
};
$(function() {
  $('#new-reply').hide();     // hide reply forum
  $('#back').hide();          // hide back button
  postsView.getTemplate();    // get post template
  repliesView.getTemplate();  // get reply template
  Post.pullPost();            // fetch most recent forum data from Firebase
  Post.newPost();             // assign event handler for creating new post
});
