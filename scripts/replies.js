function Reply (opts) {
  Object.keys(opts).forEach(function(e,index,keys) {
    this[e] = opts[e];
  },this);
}

Reply.newReply = function(id, uid) {
  $('#new-reply').off('submit');
  $('#new-reply').on('submit', function(e) {
    e.preventDefault();
    isReply = true;
    if (currentUsername !== '') {
      $('#replyAuthor').val(currentUsername);
    }
    var newReply = new Reply({
      author: $('#replyAuthor').val(),
      body: $('#replyBody').val(),
      date: new Date().toDateString() + ' ' + new Date().toLocaleTimeString()
    });
    postList[id-1].replies.push(newReply);
    var data = JSON.stringify(postList[id-1]);
    ref.child(uid).set(data);
    repliesView.appendReply(newReply, id-1, uid);
    $('#' + uid + ' .numReplies').text('Replies: ' + postList[id-1].replies.length);
    $('#new-reply')[0].reset();
  });

};
