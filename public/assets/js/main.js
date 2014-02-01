
(function($) {
  
  var loadTodos = function(todos) {
      todos = JSON.parse(todos);
      var $list = $('ul.todoList');
      $list.html('');
      todos.forEach(function(todo) {
        $list.append('<li>' + todo.content + '</li>');
      });
    };

  $(document).on('submit', 'form.edit', function(e) {
    e.preventDefault();
    var text = $(this).find('input[name="taskName"]').val();
    //console.log(text);
    var req = $.ajax({
      url: '/todos',
      method: 'post',
      contentType: 'json',
      data: JSON.stringify({
        content: text
      })
    });
    
    req.done(loadTodos);

  });


  $(document).on('ready', function() {
    var text = $(this).find('input[name="taskName"]').val();
    //console.log(text);
    var req = $.ajax({
      url: '/todos',
      method: 'get',
      contentType: 'json',
    });
    req.done(loadTodos);
  });
}).call(this, jQuery);




