app.view.Task = Backbone.View.extend({
  className: 'task',
  tagName: 'li',
  render: function() {
    this.$el.html(this.template(this.model.attributes));
  },
  initialize: function() {
    this.template = _.template($('#task').html());
    this.$el.addClass('task-order-' + this.model.get('order'));
    this.render();
  }
});