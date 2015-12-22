var postsView = {};

postsView.getTemplate = function() {
  $.get('templates/posts.html', function(data, message, xhr) {
    postsView.postTemplate = Handlebars.compile(data);
  });
};
postsView.show = function(post, uid) {
  var html = postsView.postTemplate(post);
  $('#entries').prepend(html);
  $('#entries article:first-child').attr('id',uid);
  postsView.replyHandler();
};
postsView.replyEvent = function(event) {
  event.preventDefault();
  var id = $(this).siblings('.postNum').text();
  // $(this).parent().attr('id', 'activePost');
  var uid = $(this).parent().attr('id');

  if ($('.postedReplies').length === 0) {
    postList[id-1].replies.forEach(function(reply) {
      repliesView.showReply(reply, id, uid);
    });
  }
  else {
    repliesView.showReplies(id, uid);     // show existing replies
  }
  Reply.newReply(id, uid);

  $('#new-reply').show();
  $('#new-post').hide();
  $(this).parent().siblings().hide();
  $('#back').show();
  $('.title').unbind('click', postsView.replyEvent);
};
postsView.replyHandler = function() {
  // clicking on title hides other posts, shows reply form/back button/post replies
  // repliesView.getTemplate();
  $('.title').on('click', postsView.replyEvent);
    // event.preventDefault();
    // var id = $(this).siblings('.postNum').text();
    // // $(this).parent().attr('id', 'activePost');
    // var uid = $(this).parent().attr('id');
    //
    // if ($('.postedReplies').length === 0) {
    //   postList[id-1].replies.forEach(function(reply) {
    //     repliesView.showReply(reply, id, uid);
    //   });
    // }
    // else {
    //   repliesView.showReplies(id, uid);     // show existing replies
    // }
    // Reply.newReply(id, uid);
    //
    // $('#new-reply').show();
    // $('#new-post').hide();
    // $(this).parent().siblings().hide();
    // $('#back').show();
    // $('.title').unbind();
  // };
  // clicking back button shows all posts, hides reply form/back button
  $('#back').click(function(event) {
    event.preventDefault();
    // $('#activePost').removeAttr('id');
    $('#back').hide();
    $('.posts').siblings().show();
    $('.postedReplies').hide();
    $('#new-reply').hide();
    $('#new-post').show();
    $('.title').bind('click', postsView.replyEvent);
  });
};
