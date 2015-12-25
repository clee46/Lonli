util = {};
//I don't think this will stop all XSS attacks, but some.
util.sanitize = function(text){
  // replaces <script> with 'XSS attack detected'
  var tempText = text.replace(/<script[^>]*>/gi, ' <strong class="attack">XSS attack detected :</strong> ');
  //replaces </script> with 'End of XSS attack'
  tempText = tempText.replace(/<\/script[^>]*>/gi, ' <strong class="attack">End of XSS attack</strong> ');
  return tempText;
};
