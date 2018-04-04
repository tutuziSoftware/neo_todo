function listController(Sortable){
	const sort = Sortable.new();
	const query = '#'+Sortable.name;
	const showList = neo['show'+Sortable.name+'List'];

	sort.then(function(sortTable){
		Todo.getAll().then(function(todos){
			//sortTableとtodosの整合性チェック
			const check = Object.keys(todos).every(function(id){
				const todo = todos[id];
				return sortTable.isExist(todo);
			});

			//必要に応じてsortTableにデータを追加
			if(check === false){
				Object.keys(todos).forEach(function(id){
					const todo = todos[id];
					const exist = sortTable.isExist(todo);

					if(exist === false){
						sortTable.push(id);
					}
				});

				sortTable.save();
			}

			showList(todos, sortTable, query);

			$('.template-check').on('change', function(){
				//チェックした/外したをDBに記録するイベント。showList実施後に設置しなければならないのでここに
				const id = $(this).parents('.todo').find('.template-id').val();
				const checked = $(this).prop('checked');

				Todo.find(id).then(function(todo){
					todo.checked = checked;

					return Todo.update(id, todo);
				}).catch(function(){
					debugger;
				});
			});
		}).catch(function(e){
			console.log(e);
			debugger;
		});
	}).catch(function(){
		debugger;
	});
}