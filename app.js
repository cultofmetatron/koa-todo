//jshint esnext
var koa          = require('koa');
var staticServer = require('koa-static');
var parse        = require('co-body');
var router       = require('koa-route');
var underscore   = require('underscore');
var Promise      = require('bluebird');
var path         = require('path');

var fs = Promise.promisifyAll(require('fs'));
var app = koa();

var todos = [];

app.use(staticServer(path.join(__dirname, 'public')))

app.use(router.post('/todos', function *() {
  var todo = (yield parse.json(this));
  todos.push(todo);
  this.body = JSON.stringify(todos);
}));

app.use(router.get('/todos', function *() {
  this.body = JSON.stringify(todos);
}));





var port = 3000
console.log('now listening on port: ', port);
app.listen(port);
