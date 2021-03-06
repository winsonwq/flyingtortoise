describe('AddTask View', function() {
  var collection;
  var addTaskView;
  var eventStub = {
    preventDefault: function() {}
  };

  beforeEach(function() {
    collection = new app.collection.Tasks();
    addTaskView = new app.view.AddTask({
      collection: collection
    });
  });

  it('should add task', function() {
    var expectedTaskName = 'expected task name';
    addTaskView.$el.find('.new-task-name').val(expectedTaskName);
    addTaskView.addTask(eventStub);

    expect(collection.length).toBe(1);
    expect(collection.at(0).get('name')).toBe(expectedTaskName);
  });

  it('should update class name when added task', function() {
    expect(addTaskView.$el).toHaveClass('task-order-1');

    addTaskView.addTask(eventStub);

    expect(addTaskView.$el).toHaveClass('task-order-2');

    addTaskView.addTask(eventStub);

    expect(addTaskView.$el).toHaveClass('task-order-3');
  });

  describe('should hide when there are 4 tasks', function() {
    it('after add task', function() {
      appendSetFixtures(addTaskView.$el);
      add4TasksToView();

      expect(addTaskView.$el).toBeHidden();
    });

    it('after initialize', function() {
      add4TasksToCollection();
      addTaskView = new app.view.AddTask({
        collection: collection
      });

      appendSetFixtures(addTaskView.$el);

      expect(addTaskView.$el).toBeHidden();
    });
  });

  it('should show add task form when click to add task button', function() {
    appendSetFixtures(addTaskView.$el);
    addTaskView.toAddTask();

    expect(addTaskView.$el.find('form')).toBeVisible();
    expect(addTaskView.$el.find('.add-task-title')).toBeHidden();
    expect(addTaskView.$el.find('.add-task-markup')).toBeHidden();
    expect(addTaskView.$el.find('.new-task-name')).toBeFocused();
  });

  it('should hide add task form after added task', function() {
    appendSetFixtures(addTaskView.$el);
    addTaskView.addTask(eventStub);

    expect(addTaskView.$el.find('form')).toBeHidden();
    expect(addTaskView.$el.find('.add-task-title')).toBeVisible();
    expect(addTaskView.$el.find('.add-task-markup')).toBeVisible();
  });

  function add4TasksToCollection() {
    collection.create();
    collection.create();
    collection.create();
    collection.create();
  }

  function add4TasksToView() {
    for (var i = 0; i < 4; i++) {
      addTaskView.addTask(eventStub);
    }
  }
});