var repliesView = {};

repliesView.getTemplate = function() {
  $.get('templates/replies.html', function(data, message, xhr) {
    repliesView.replyTemplate = Handlebars.compile(data);
  });
};
// repliesView.showReplies = function(id) {
//   $('.postedReplies').show().empty();
//   // postList[id-1].replies.forEach(function(reply) {
//   $('#activePost .postedReplies').append(repliesView.replyTemplate(reply));
//   // });
// };
repliesView.showReply = function(reply,id) {
  var html = repliesView.replyTemplate(reply);
  $('#activePost').append(html);
};
