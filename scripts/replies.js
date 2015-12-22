function Reply (opts) {
  Object.keys(opts).forEach(function(e,index,keys) {
    this[e] = opts[e];
  },this);
}

Reply.newReply = function(id, uid) {
  console.log(uid);
  $('#new-reply').on('submit', function(e) {
    e.preventDefault();
    console.log('You assigned multiple event handlers!');
    var newReply = new Reply({
      author: $('#replyAuthor').val(),
      body: $('#replyBody').val(),
      date: new Date(e.timeStamp),
    });
    if (newReply) {
      postList[id-1].replies.push(newReply);
      var data = JSON.stringify(postList[id-1]);
      forumData.child(uid).set(data);
      repliesView.showReply(newReply, id-1, uid);
    }
  });

};
