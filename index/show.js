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


neo.showTagSortableList = function(todos, sortTable, query){
	$(query + " *").remove();

	//ヘッダ生成
	const groupNames = sortTable.constructor.getGroupNames();
	groupNames.forEach(function(groupName, id){
		const $header = $($("#todo_header_template").text());
		$header.attr("id", "tag" + id).text(groupName).appendTo(query);
	});

	//データをtagIdごとに分類
	const sortTodos = (function(){
		const sortTodos = {};
		sortTable.constructor.getGroupNames().forEach(function(_, id){
			sortTodos[id] = [];
		});

		return sortTodos;
	})();
	Object.keys(todos).forEach(function(id){
		const todo = todos[id];
		const tagId = todo.tag;

		if(tagId === undefined || tagId.length === 0){
			sortTodos[neo.TagSortable.DEFAULT_PUSH_KEY_NAME()].push(todo);
		}else{
			tagId.forEach(function(tagId){
				sortTodos[tagId].push(todo);
			});
		}
	});

	//表示
	Object.keys(sortTodos).forEach(function(tagId){
		const sortedTodos = sortTodos[tagId];

		sortedTodos.forEach(function(todo){
			const $todo = $($('#todo_template').text());
			$todo.find('.template-id').val(todo.id);
			$todo.find('.template-title').text(todo.title);
			$todo.find('.template-url').attr('href', $todo.find('.template-url').attr('href')+'?id='+todo.id);
			$todo.find('.template-check').attr('checked', todo.checked);

			$("#tag" + tagId).after($todo);
		});
	});

	//TODO 分けたデータ + sortTableの並び順で表示

	//TODO 時間(明日とか明後日とか)はどう実装したものか……
};


neo.showNeoSortableList = function(todos, sortTable, query){
	//残り時間算出
	const hour23 = (function(){
		const hour23 = new Date();
		hour23.setHours(23);
		hour23.setMinutes(0);
		hour23.setSeconds(0);
		return hour23;
	})();
	var remaining = Math.floor((hour23.getTime() - Date.now()) / 60000);

	$(query + " *").remove();

	var isTimeout = false;
	var isToday = true;
	var isNoTimeSetting = true;

	$($("#todo_header_template").text()).text('今日やる').attr('id', 'today').appendTo(query);
	$($("#todo_header_template").text()).text('時間未指定').attr("id", "no_time_setting").appendTo(query);
	$($("#todo_header_template").text()).text('タイムアウト').attr('id', 'timeout').appendTo(query);
	$($("#todo_header_template").text()).text('明日').attr('id', 'tomorrow').appendTo(query);

	sortTable.forEach(function(id){
		const todo = todos[id];

		if(todo){
			var todoTemplate = $($('#todo_template').text());
			todoTemplate.find('.template-title').text(todo.title);
			todoTemplate.find('.template-id').val(todo.id);
			todoTemplate.find('.template-url').attr('href', todoTemplate.find('.template-url').attr('href')+'?id='+todo.id);
			todoTemplate.find('.template-check').attr('checked', todo.checked);

			remaining -= todo.lengthOfTime;

			if(todo.lengthOfTime === ""){
				$("#no_time_setting").after(todoTemplate);
				return;
			}

			if(remaining >= 0 && isToday){
				$("#today").after(todoTemplate);
				return;
			}

			if(remaining < 0 && isTimeout === false){
				$("#timeout").after(todoTemplate);
				return;
			}
		}
	});
}


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