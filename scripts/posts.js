var forumData = new Firebase('https://brilliant-fire-1757.firebaseio.com/');

function Post (opts) {
  Object.keys(opts).forEach(function(e,index,keys) {
    this[e] = opts[e];
  },this);
  // this.body = opts.body || marked(this.markdown);
}
Post.storePost = function() {
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
    postsView.show(newPost);
    // postsView.reply();
  });
};

$(function() {
  $('#new-reply').hide();
  $('#back').hide();
  postsView.getTemplate();
  Reply.getTemplate();
  postsView.pullPost();
  Post.storePost();
  // postsView.reply();
});
