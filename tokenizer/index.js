module.exports = function (kathaa_inputs, progress, done){
  ////console.log("Inside tokenizer");
  //save computed output values
  var kathaa_outputs = {}

  hindi_urdu_request.post({
    headers: {'content-type' : 'application/x-www-form-urlencoded;charset=UTF-8'},
    url:     'http://api.ilmt.iiit.ac.in/hin/urd/1/1',
    body:    "input="+encodeURI(kathaa_inputs['in_ssf'])
  }, function(error, response, body){
    if (!error && response.statusCode == 200) {
      try{
        ////console.log(body);
        body = hindi_urdu_entities.decode(body);
        body = JSON.parse(body);
        //Assumes only one key is passed
        for(var _key in body){
          kathaa_outputs['out_ssf'] = body[_key];
          done && done(null, kathaa_outputs);
          return;
        }
      }catch(e){
        var err = new Error('Malformed reply from Sampark API Server');        
        done(err);
      }
    }else{
      var err = new Error('Sampark API Server non responsive');      
      done(err);
    }
  });
//
// 
// Available external libraries 
// 
// GLOBAL.hindi_urdu_request = require('request');
// GLOBAL.hindi_urdu_Entities = require('html-entities').AllHtmlEntities;
// GLOBAL.hindi_urdu_entities = new GLOBAL.hindi_urdu_Entities();
}
