var repliesView = {};

repliesView.getTemplate = function() {
  console.log('repliesView.getTemplate called');
  $.get('templates/replies.html', function(data, message, xhr) {
    repliesView.replyTemplate = Handlebars.compile(data);
  });
};
repliesView.showReplies = function(id, uid) {
  console.log('showReplies called');
  $('#' + uid + ' .postedReplies').show();
};
repliesView.appendReply = function(reply,id, uid) {
  console.log('appendReply called');
  reply.body = marked(reply.body);
  //remove scrpit tags
  reply.body = util.sanitize(reply.body);
  var html = repliesView.replyTemplate(reply);
  $('#' + uid + ' .postedReplies').append(html).show();
};
