function editPageInit(e){
	editPageInit.pageInits.forEach(function(pageInit){
		pageInit(e);
	})
}
editPageInit.pageInits = [];

editPageInit.pageInits.push(function(){
	//優先度の表示。HTMLと齟齬がないよう定数からHTMLを出す
	Object.keys(TODO_PRIORITY).forEach(function(key){
		const priority = TODO_PRIORITY[key];
		var optionTag = $('<option>');
		optionTag.attr('value', priority.id)
		optionTag.text(priority.name);
		optionTag.appendTo('#priority');
	});
});

//ページを開いた時、idを元にデータを取得・表示する
editPageInit.pageInits.push(function(e){
	if(e.route.path !== '/edit/') return;

	const todoId = e.route.query.id;

	Todo.find(todoId).then(function(todo){
		//TODO ここはeditのshowに移動すべき
		Object.keys(todo).forEach(function(key){
			$(e.pageEl).find('#'+key).val(todo[key]);
		});
	}).catch(function(){
		debugger;
	});
});

//ページを閉じた時、データを保存する
function beforeOut(e){
	if(e.route.path !== '/edit/') return;

	const editTodo = {};
	editTodo.id = e.route.query.id;
	e.$el.find('input,select').each(function(index, input){
		editTodo[input.id] = $(this).val();
	});

	//もしTODOリストが更新されなかった場合は、ここの非同期保存が機能してないんだと予想される
	Todo.update(editTodo.id, editTodo);
}