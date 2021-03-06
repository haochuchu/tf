var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var get = require('./routes/get');
var post = require('./routes/post');
var nav = require('./routes/nav');
var journey = require('./routes/journey');
var made = require('./routes/made');
var footer = require('./routes/footer');
var img = require('./routes/img');
var pic_list = require('./routes/pic_list');
var prize = require('./routes/prize');
var brand = require('./routes/brand');
var system = require('./routes/system');
var first_page = require('./routes/first_page');
var grow = require('./routes/grow');
var cont = require('./routes/cont');
var contact = require('./routes/contact');
var carousel = require('./routes/carousel');
var bundle = require('./routes/bundle');
var supers = require('./routes/supers');
var animate_one = require('./routes/animate_one');
var animate_two = require('./routes/animate_two');
var animate_three = require('./routes/animate_three');
var hot_line = require('./routes/hot_line');
var message = require('./routes/message');
var con_img = require('./routes/con_img');
var backcases = require('./routes/backcases');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/text', get);
app.use('/text', post);
app.use('/tianfang', nav);
app.use('/tianfang', journey);
app.use('/tianfang', made);
app.use('/tianfang', footer);
app.use('/tianfang', img);
app.use('/tianfang', pic_list);
app.use('/tianfang', prize);
app.use('/tianfang', brand);
app.use('/tianfang', system);
app.use('/tianfang', first_page);
app.use('/tianfang', grow);
app.use('/tianfang', cont);
app.use('/tianfang', contact);
app.use('/tianfang', carousel);
app.use('/tianfang', bundle);
app.use('/tianfang', supers);
app.use('/tianfang', animate_one);
app.use('/tianfang', animate_two);
app.use('/tianfang', animate_three);
app.use('/tianfang', hot_line);
app.use('/tianfang', message);
app.use('/tianfang', con_img);
app.use('/tianfang', backcases);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(8100,function(){
	console.log("Server Start!");
})

module.exports = app;
