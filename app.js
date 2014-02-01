//jshint esnext
var koa = require('koa');
var app = koa();

app.use(function *(next) {
  var start = new Date();
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

//logger

app.use(function *(next) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(function *(next) {
  if (this.url === '/foo') {
    this.body = 'hello valhalasause';
    this.response.redirect('/bar');
  } else {
    yield next;
  }
});

//response
app.use(function *() {
  console.log(this.request.header);
  this.body = 'Hello world';
});

app.listen(3000);
