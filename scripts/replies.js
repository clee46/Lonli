function Reply (opts) {
  Object.keys(opts).forEach(function(e,index,keys) {
    this[e] = opts[e];
  },this);
  // this.body = opts.body || marked(this.markdown);
}
Reply.getTemplate = function() {
  $.get('templates/replies.html', function(data, message, xhr) {
    Reply.replyTemplate = Handlebars.compile(data);
  });
};
Reply.storeReply = function() {
  $('#new-reply').on('submit', function(e) {
    e.preventDefault();
    var newReply = new Reply({
      author: $('#author').val(),
      body: $('#body').val(),
      date: new Date(e.timeStamp),
      gender: $('input[name="gender"]:checked').val(),
    });
    // ???.replies.push(newReply);
    var postString = JSON.stringify(postList);
    forumData.push(postString);
    postsView.show(newPost);
  });
};
