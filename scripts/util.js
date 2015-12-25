util = {};
//I don't think this will stop all XSS attacks, but some.
util.sanitize = function(text){
  var tempText = text.replace(/<script[^>]*>/gi, ' <strong class="attack">XSS attack detected :</strong> ');
  tempText = tempText.replace(/<\/script[^>]*>/gi, ' <strong class="attack">End of XSS attack</strong> ');
  return tempText;
};
