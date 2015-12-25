util = {};
//I don't think this will stop all XSS attacks, but some.
util.sanitize = function(text){
  return text.replace(/<script[^>]*>/gi, ' <!-- ');
};
