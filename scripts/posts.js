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
      uid: '',
      replies: []
    });
    // $('#new-post')[0].reset();
    var postString = JSON.stringify(newPost);
    forumData.push(postString);
  });
};
Post.handleValueChange = function(dataSnapshot) {
  $('#entries').empty();
  dataSnapshot.forEach(function(item) {
    var uid = item.key();
    console.log(uid);
    console.log(item.val());
    // console.log(JSON.parse(item.val()));
    // var temp = new Post(JSON.parse(item.val()));
    // console.log(temp);
    // temp.uid = uid;
    console.log(new Post(item.val()));
    postsView.show(new Post(item.val()),uid);
    // postList.push(new Post(JSON.parse(item.val())));
    // $('#entries').append('UID: ' + item.name() + ': ' + item.val());
  });
  postsView.replyHandler();
};
$(function() {
  $('#new-reply').hide();   // hide reply forum
  $('#back').hide();        // hide back button
  postsView.getTemplate();  // get post template
  repliesView.getTemplate();
  Post.newPost();
  $('#entries').empty();
  forumData.on('value', Post.handleValueChange);
  // postsView.replyHandler();
});
