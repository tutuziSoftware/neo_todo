/**
 * TODOリストの描画を行う関数です
 * @param todos 表示するデータ
 */
neo.showUserSortableList = function(todos, sortTable, query){
	//TODO (低)todosとsortTableの整合性チェックを追加する

	$(query+' .todo').remove();

	sortTable.forEach(function(id){
		if(todos[id]){
			show(todos[id]);
			delete todos[id];
		}
	});

	function show(todo){
		var todoTemplate = $($('#todo_template').text());
		todoTemplate.find('.template-title').text(todo.title);
		todoTemplate.find('.template-id').val(todo.id);
		todoTemplate.find('.template-url').attr('href', todoTemplate.find('.template-url').attr('href')+'?id='+todo.id);
		todoTemplate.find('.template-check').attr('checked', todo.checked);

		//TODO ここで#now_listの直後に要素を追加してるので逆に表示される
		//     つまるところソート順が変わるとここの実装方式が変わるので、あまり深追いしなくて良いかも
		//$('#todo_list').find('#now_list').after(todoTemplate);
		todoTemplate.appendTo(query);
	}
};


neo.showPrioritySortableList = function(todos, sortTable, query){
	$(query + " *").remove();

	//todoを優先順で分割
	var priorityTodos = {};
	Object.keys(TODO_PRIORITY).forEach(function(priorityId){
		const priority = TODO_PRIORITY[priorityId];

		priorityTodos[priorityId] = Object.keys(todos).filter(function(key){
			var todo = todos[key];
			return priority.equal(todo.priority);
		}).map(function(key){
			return todos[key];
		});
	});

	//表示
	Object.keys(TODO_PRIORITY).forEach(function(key){
		//ヘッダ表示
		var $header = $($("#todo_header_template").text());
		var headerName = TODO_PRIORITY[key].name;
		$header.text(headerName).appendTo(query);

		//todo表示
		priorityTodos[key].forEach(function(priority){
			var $todo = $($("#todo_template").text());
			$todo.find('.template-title').text(priority.title);
			$todo.appendTo(query);
		});
	});
};


function showTodoListHeaders(){
	//headerの削除
	TODO_HEADER_SETTINGS.forEach(function(headerSetting){
		$('#'+headerSetting.html_id).remove();
	});

	//headerの表示
	TODO_HEADER_SETTINGS.forEach(function(headerSetting){
		var line = $($('#todo_header_template').text());
		line.attr('id', headerSetting.html_id);
		line.text(headerSetting.name);
		$('#todo_list').append(line);
	});
}