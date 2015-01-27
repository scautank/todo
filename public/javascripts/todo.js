require.config({
	paths : {
		jquery : 'lib/jquery-1.11.1.min',
		knockout : 'lib/knockout-3.1.0'
	}
});

require(['jquery', 'knockout', 'todo_model'], function($, ko, toDoModel){

	var ToDoViewModel = function(){
		this.title = ko.observable('');
		this.list = ko.observableArray();
	};

	ToDoViewModel.prototype.add = function(el, ev) {
		var _this = this;
		if(event.keyCode === 13) {
			if(this.title().length > 0){
				$.post('/api/todo/add', {title : this.title}, function(result){
					_this.title('');
					result.success ? _this.fetch() : alert(result.error_msg);
				});
			} else{
				alert('内容不能为空');
			}
		}
	};

	ToDoViewModel.prototype.fetch = function() {
		var result,_ref,i,len,_this = this;

		$.get('/api/todo/list', function(data){
			if(data.success){
				_ref = data.result;
				result = [];
				for(i = 0, len = _ref.length; i < len; i++){
					result.push(new toDoModel.ToDoModel(_ref[i], _this));
				}
				_this.list(result);
			}
		});
	};

	var toDoViewModel = new ToDoViewModel();
	toDoViewModel.fetch();

	ko.applyBindings(toDoViewModel);
});