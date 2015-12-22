function Reply (opts) {
  Object.keys(opts).forEach(function(e,index,keys) {
    this[e] = opts[e];
  },this);
}

var postList = [];

Reply.newReply = function(uid) {
  $('#new-reply').on('submit', function(e) {
    e.preventDefault();
    var newReply = new Reply({
      author: $('#replyAuthor').val(),
      body: $('#replyBody').val(),
      date: new Date(e.timeStamp),
    });
    $('#new-reply')[0].reset();

    postList.forEach(function(post) {
      if (post.uid === uid) {
        post.replies.push(newRply);
      }
    });
    repliesView.showReply(newReply, uid);
    // var data = JSON.stringify(postList[id-1);
    forumData.child(uid).set(post);
  });
};
