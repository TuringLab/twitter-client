var express = require('express')
var app = express()
app.use('/',express.static('client'));
app.listen(3000,function(){
  console.log('Server Running on port 3000')
})