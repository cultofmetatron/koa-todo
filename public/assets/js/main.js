
(function($) {
  window.templates = {};
  $('script[type="template/underscore"]').each(function() {
    templates[$(this).data('name')] = _.template($(this).html());
  });

  var loadTodos = function(todos) {
      todos = JSON.parse(todos);
      var $list = $('ul.todoList');
      $('input[name="taskName"]').val('');
      $list.html('');
      todos.forEach(function(todo) {
        $list.append(templates.listItem(todo));
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
  
  $('ul.todoList').on('click', 'li a.delete', function(e) {
    e.preventDefault();
    var $el = $(this);
    var href = $el.attr('href');
    $.ajax({
      url: href,
      method: 'delete',
      type: 'delete'
    })
    
    .done(loadTodos);


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




