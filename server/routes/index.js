const express = require('express'),
router = express.Router(),
util = require('util'),
path = require('path'),
request = require('request'),
client = require(path.join(__dirname, '../redis/client.js'));
const apiHost = process.env.API_HOST || 'localhost';
const apiPort = process.env.API_PORT || 3002;
const connectionString = `http://${apiHost}:${apiPort}`;






router.get('/',(req, res, next)=> {
    res.render('index', {title: 'Alayo'})
});

router.post('/login',(req, res, next)=> {

  let opts = {
    username:req.body.user,
    password:req.body.pass
  }
  let options = {
    url:connectionString + '/api/users/login',
    form:opts
  };


  request.post(options, function(err,response,body){
    if(err){
      res.send(err);
    }
    let x = JSON.parse(response.body)
    console.log(req.session);
    res.locals.session.key = x.id;
    console.log(res.locals.session.key);
    res.json(x);
  })




});
router.post('/register', function(req, res) {
  let hashedPassword = bcrypt.hashSync(req.body.password, 10);
  console.log(hashedPassword);

});

router.post('/logout', function(req, res) {


  const url = connectionString +'/api/users/logout?access_token='+req.body.token
  console.log(url);
  let options = {
    url:url,
    headers:{
      "Content-Type": "application/json"
    }
  };
  request.post(options, function(err,response,body){
    if(err){
      res.send(err);
    }
      res.send(response);
  })


});



module.exports = router;
