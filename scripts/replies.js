function Reply (opts) {
  Object.keys(opts).forEach(function(e,index,keys) {
    this[e] = opts[e];
  },this);
}

Reply.newReply = function() {
  $('#new-reply').on('submit', function(e) {
    e.preventDefault();
    var newReply = new Reply({
      author: $('#replyAuthor').val(),
      body: $('#replyBody').val(),
      date: new Date(e.timeStamp),
    });
    $('#new-reply')[0].reset();
    
    // postList[id-1].replies.push(newReply);
    // repliesView.showReply(newReply, id-1);
    // var data = JSON.stringify(postList[id-1]);
    // forumData.child(postList[id-1].uid).set(data);
  });
};
