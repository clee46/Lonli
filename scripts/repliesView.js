var repliesView = {};

repliesView.getTemplate = function() {
  $.get('templates/replies.html', function(data, message, xhr) {
    repliesView.replyTemplate = Handlebars.compile(data);
  });
};
repliesView.showReplies = function(id, uid) {
  $('#' + uid + ' .postedReplies').show();
  // postList[id-1].replies.forEach(function(reply) {
  //   $('#' + uid + ' .postedReplies').append(repliesView.replyTemplate(reply));
  // });
};
repliesView.showReply = function(reply,id, uid) {
  var html = repliesView.replyTemplate(reply);
  $('#' + uid + ' .postedReplies').append(html);
};
