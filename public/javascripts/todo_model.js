define(['jquery', 'knockout'], function($, ko){
	var ToDoModel = function(props, parent){
		this.parent = parent;
		this.ctrlBtn = ko.observable(false);
		for(var key in props) {
			this[key] = props[key];
		}
	}

	ToDoModel.prototype.remove = function(el, ev){
		var _this = this;
		$.get('/api/todo/del/'+ el.id, function(result){
			if(result.success) {
				_this.parent.list.remove(_this);
			}
		});
	};

	ToDoModel.prototype.doubleClickHandler = function() {
		this.ctrlBtn(true);
	};

	ToDoModel.prototype.keyUpEdit = function(el, ev) {
		if(ev.keyCode === 13){
			if(el.title.length > 0){
				this.save(el);
			}
		}
	};

	ToDoModel.prototype.edit = function(el, ev) {
		if(el.title.length > 0){
			this.save(el);
		}
	};

	ToDoModel.prototype.save = function(el) {
		var _this = this;
		$.post('/api/todo/edit/'+ el.id, {title: el.title}, function(result){
			result.success ? _this.parent.fetch() : alert(result.error_msg);
		});
	};

	return {
		ToDoModel : ToDoModel
	};
});