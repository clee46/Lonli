var resourcesView = {};

resourcesView.filterHandler = function() {
  // $('.box').hide();
  $('select').change(function() {
    $(this).find('option:selected').each(function() {
      if($(this).attr('value')=='depression') {
        $('.box').not('.depression').hide();
        $('.depression').show();
      }
      else if($(this).attr('value')=='anxiety') {
        $('.box').not('.anxiety').hide();
        $('.anxiety').show();
      }
      else if($(this).attr('value')=='therapy') {
        $('.box').not('.therapy').hide();
        $('.therapy').show();
      }
      else if($(this).attr('value')=='medication') {
        $('.box').not('.medication').hide();
        $('.medication').show();
      }
      else if($(this).attr('value')=='selfharm') {
        $('.box').not('.selfharm').hide();
        $('.selfharm').show();
      }
      else if($(this).attr('value')=='community') {
        $('.box').not('.community').hide();
        $('.community').show();
      }
      else if($(this).attr('value')=='all') {
        $('.box').show();
      }
    });
  });
};
