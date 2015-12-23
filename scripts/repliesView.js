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
  var html = repliesView.replyTemplate(reply);
  console.log(html);
  $('#' + uid + ' .postedReplies').append(html).show();
};
