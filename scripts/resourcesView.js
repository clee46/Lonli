var resourcesView = {};
resourcesView.filterHandler = function() {
  $('#resources').on('change', function(event) {
    $('.box').show();
    console.log($('#resources').val());
    if ($('#resources').val() === 'all') {
      $('#resources-tab').show();
    }
    else {
      $('.box:not('+'.' + this.value + ')').hide();
    }
  });
};
