//jshint esnext
var koa          = require('koa');
var staticServer = require('koa-static');

//this allows us to parse the native req object to get the body
var parse        = require('co-body');

var router       = require('koa-route');
var _            = require('underscore');

var Promise      = require('bluebird');
var path         = require('path');

var fs = Promise.promisifyAll(require('fs'));
var app = koa();
//our very basic data store
var todos = [];

//gets us unique ids
var counter = (function() {
  var count = 0;
  return function() {
    count++;
    return count;
  };
})();

//
app.use(staticServer(path.join(__dirname, 'public')));

app.use(router.post('/todos', function *() {
  var todo = (yield parse.json(this));

  todo.id = counter();
  todos.push(todo);
  this.body = JSON.stringify(todos);
}));


app.use(router.get('/todos', function *() {
  this.body = JSON.stringify(todos);
}));

app.use(router.get('/source', function *() {
  var contents = yield fs.readFileAsync('./app.js', 'utf8');
  this.body = contents;
}));

app.use(router.delete('/todos/:id', function *(id) {
  todos = _(todos).reject(function(todo) {
    console.log('what? ', todo, id );
    return todo.id === parseInt(id, 10);
  }, this);
  console.log(todos);
  this.body = JSON.stringify(todos.sort(function(a, b) { return a - b;}));
}));



app.listen(3000);
console.log('listening on port 3000');
