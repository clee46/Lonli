view = {};
view.showExistingUserBtn = function() {
  $('#new-user').hide();
  $('#existing-user').show();
  $('#new-prompt').show();
  $('#existing-prompt').hide();
};
view.showNewUserBtn = function() {
  $('#new-user').show();
  $('#existing-user').hide();
  $('#existing-prompt').show();
  $('#new-prompt').hide();
};
view.showLogin = function() {
  $('#login-status').hide();
  $('#login-logout').text('Login');
  $('#login-status').empty().append('<p>You are not logged in.</p>');
  $('#login-tab').show();
  $('#forum-tab').hide();
  $('#mood-tab').hide();
  $('#resources-tab').hide();
};
view.showNav = function() {
  var nav = $('nav');
  var navHomeY = nav.offset().top;
  var isFixed = false;
  var $w = $(window);
  $w.scroll(function() {
    var scrollTop = $w.scrollTop();
    var shouldBeFixed = scrollTop > navHomeY;
    if (shouldBeFixed && !isFixed) {
      nav.css({
        position: 'fixed',
        top: 0,
        left: nav.offset().left,
        width: nav.width()
      });
      isFixed = true;
    }
    else if (!shouldBeFixed && isFixed)
    {
      nav.css({
        position: 'static'
      });
      isFixed = false;
    }
  });
};
view.showResources = function() {
  $('#login-status').show();
  $('#login-tab').hide();
  $('#forum-tab').hide();
  $('#mood-tab').hide();
  $('#resources-tab').show();
};
view.showMood = function() {
  $('#login-status').show();
  $('#login-tab').hide();
  $('#forum-tab').hide();
  $('#mood-tab').show();
  $('#resources-tab').hide();
  if (currentUserId !== '') {
    moodView.makeChart();
    moodView.makeChart();
  }
};

view.showForum = function() {
  $('#login-status').show();
  $('#login-tab').hide();
  $('#forum-tab').show();
  $('#mood-tab').hide();
  $('#resources-tab').hide();
  $('#new-post').show();      // show new post form
  $('#new-reply').hide();     // hide reply form
  $('#back').hide();          // hide back button
  $('#loadMore').show();
};
