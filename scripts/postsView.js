var postsView = {};

postsView.getTemplate = function() {
  $.get('templates/posts.html', function(data, message, xhr) {
    postsView.postTemplate = Handlebars.compile(data);
  });
};
postsView.show = function(post) {
  var html = postsView.postTemplate(post);
  $('#entries').prepend(html);
  postsView.replyHandler();
};
postsView.replyHandler = function() {
  // clicking on title hides other posts, shows reply form/back button/post replies
  repliesView.getTemplate();
  $('.title').click(function(event) {
    event.preventDefault();
    var id = $(this).siblings('.postNum').text();
    $(this).parent().attr('id', 'activePost');
    repliesView.showReplies(id);
    Reply.newReply(id);

    $('#new-reply').show();
    $('#new-post').hide();
    $(this).parent().siblings().hide();
    $('#back').show();
  });
  // clicking back button shows all posts, hides reply form/back button
  $('#back').click(function(event) {
    event.preventDefault();
    $('#activePost').removeAttr('id');
    $('#back').hide();
    $('.posts').siblings().show();
    $('.postedReplies').hide();
    $('#new-reply').hide();
    $('#new-post').show();
  });
};
