const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use (function(req,res,next){
    console.log("middleware");
    next();
});

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/home', function (req, res,next) {
   return next(new Error("something went wrong"))
  })

  function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
  }
  
app.listen(3000)

