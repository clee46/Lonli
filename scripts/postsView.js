var postsView = {};

postsView.getTemplate = function() {
  $.get('templates/posts.html').done(function(data, message, xhr) {
    postsView.postTemplate = Handlebars.compile(data);
  });
};
postsView.show = function(post, uid) {
  post.body = marked(post.body);
  // remove script tags
  post.body = util.sanitize(post.body);

  post.numReplies = post.replies.length;
  var html = postsView.postTemplate(post);
  $('#entries').prepend(html);
  $('#entries article:first-child').attr('id',uid);
  postsView.replyHandler();
};
postsView.replyHandler = function() {
  // clicking on title hides other posts, shows reply form/back button/post replies
  $(document).off('click','.title').on('click', '.title', function(event) {
    console.log('replyEvent called');
    event.preventDefault();
    var id = $(this).siblings('.postNum').text().slice(6);    // get the post number
    var uid = $(this).parent().attr('id');                    // get the Firebase unique ID
    if ($(this).siblings('.postedReplies').is(':empty')) {
      postList[id-1].replies.forEach(function(reply) {
        repliesView.appendReply(reply, id, uid);
      });
    }
    else {
      repliesView.showReplies(id, uid);     // show existing replies
    }
    Reply.newReply(id, uid);
    $('#new-reply').show();             // show reply form
    $('#new-post').hide();              // hide new post form
    $(this).parent().siblings().hide(); // hide all other posts but this one
    $('#back').show();                  // show back button
    $('#loadMore').hide();
    $('#filter').find(':first-child').attr('selected', true);
    $('#filter').hide();
    $('label[for="filter"]').hide();
  });
  // clicking on back button shows all posts, hides reply form/back button/post replies
  $('#back').on('click', function(event) {
    event.preventDefault();
    $('#back').hide();              // hide back button
    // $('.posts').siblings().show();  // show all posts
    postsView.limitPosts();
    $('.postedReplies').hide();     // hide all replies
    $('#new-reply').hide();         // hide reply form
    $('#new-post').show();          // show new post form
    $('#loadMore').show();
    $('#filter').show();
    $('label[for="filter"]').show();
  });
};
postsView.filterHandler = function() {
  $('#filter').on('change', function(event) {
    $('#entries').find('.posts').show();    // resets to show all posts
    if ($('#filter').val() === 'all') {
      $('#entries').find('.posts').show();
      postsView.limitPosts();
      $('#loadMore').show();
    }
    else {
      $('.category:not(:contains(' + this.value + '))').parent().hide();
      $('#loadMore').hide();
    }
  });
};
postsView.limitPosts = function() {
  $('.posts').hide();
  $('.posts').each(function(index) {
    if (index < 2){
      $(this).show();
    }
  });
};
postsView.loadMore = function() {
  $('#loadMore').on('click', function(event) {
    event.preventDefault();
    $('#entries article:hidden').each(function(index, currentElement) {
      if (index < 2){
        $(this).show();
      }
    });
  });
};
