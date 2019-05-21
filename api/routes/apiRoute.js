'use strict';
module.exports = function(app) {
  var api = require('../controllers/apiController');

  // todoList Routes
  app.route('/tasks')
    .get(api.list_all_tasks)
    .post(api.create_a_task);


  app.route('/tasks/:taskId')
    .get(api.read_a_task)
    .put(api.update_a_task)
    .delete(api.delete_a_task);
    
};
