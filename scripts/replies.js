function Reply (opts) {
  Object.keys(opts).forEach(function(e,index,keys) {
    this[e] = opts[e];
  },this);
}

Reply.newReply = function(id) {
  $('#new-reply').on('submit', function(e) {
    e.preventDefault();
    var newReply = new Reply({
      author: $('#replyAuthor').val(),
      body: $('#replyBody').val(),
      date: new Date(e.timeStamp),
    });
    postList[id-1].replies.push(newReply);
    repliesView.showReply(newReply, id-1);
    var data = JSON.stringify(postList[id-1]);
    forumData.push(data);
  });
};
