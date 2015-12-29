var repliesView = {};

repliesView.getTemplate = function() {
  $.get('templates/replies.html', function(data, message, xhr) {
    repliesView.replyTemplate = Handlebars.compile(data);
  });
};
repliesView.showReplies = function(id, uid) {
  $('#' + uid + ' .postedReplies').show();
};
repliesView.appendReply = function(reply,id, uid) {
  reply.body = marked(reply.body);
  reply.body = util.sanitize(reply.body);     //remove scrpit tags
  var html = repliesView.replyTemplate(reply);
  $('#' + uid + ' .postedReplies').append(html).show();
};
