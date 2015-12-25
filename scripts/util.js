util = {};
//I don't think this will stop all XSS attacks, but some.
util.sanitize = function(text){
  text.replace(/<script[^>]*>/gi, ' <!-- ');
};
