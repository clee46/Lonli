var postList = [];

function Post (opts) {
  Object.keys(opts).forEach(function(e,index,keys) {
    this[e] = opts[e];
  },this);
  this.id = postList.length + 1;
  postList.push(this);
}
Post.newPost = function() {
  $(document).off('click', '#submitpost').on('click', '#submitpost', function(e) {
    e.preventDefault();
    if (currentUsername !== '') {$('#author').val(currentUsername);}
    var newPost = new Post({
      title: $('#title').val(),
      author: $('#author').val(),
      category: $('#category').val(),
      body: $('#body').val(),
      date: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
      gender: $('input[name="gender"]:checked').val(),
      replies: []
    });
    newPost.numReplies = newPost.replies.length;
    var postString = JSON.stringify(newPost);
    ref.push(postString);
    Post.pullPost();
    $('#new-post')[0].reset();
  });
};
Post.pullPost = function() {
  console.log('pullpost isReply is ' + isReply);
  ref.on('value', function(snapshot) {
    postList = [];    // reset the postList
    $('#entries').empty();
    snapshot.forEach(function(childSnapshot) {
      var uid = childSnapshot.key();
      var temp = new Post(JSON.parse(childSnapshot.val()));
      if (!isReply) {
        console.log('showing new posts');
        postsView.show(temp, uid);
      }
      else {
        console.log('showing new reply only');
        postsView.show(temp, uid);
        postsView.tempReply(uidHolder);
        $('#' + uidHolder + ' a').parent().siblings().hide();
      }
    });
  });
  setTimeout(function() {postsView.limitPosts();}, 500);
};
