function Reply (opts) {
  console.log('Reply called');
  Object.keys(opts).forEach(function(e,index,keys) {
    this[e] = opts[e];
  },this);
}

Reply.newReply = function(id, uid) {
  console.log('newReply called');
  console.log(uid);
  $('#new-reply').off('submit');
  $('#new-reply').on('submit', function(e) {
    e.preventDefault();
    var newReply = new Reply({
      author: $('#replyAuthor').val(),
      body: $('#replyBody').val(),
      date: new Date(e.timeStamp),
    });
    postList[id-1].replies.push(newReply);
    var data = JSON.stringify(postList[id-1]);
    forumData.child(uid).set(data);
    repliesView.appendReply(newReply, id-1, uid);
  });

};
