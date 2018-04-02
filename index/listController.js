function listController(Sortable){
	const sort = Sortable.new();
	const query = '#'+Sortable.name;
	const showList = neo['show'+Sortable.name+'List'];

	sort.then(function(sortTable){
		Todo.getAll().then(function(todos){
			//sortTableとtodosの整合性チェック
			const check = Object.keys(todos).every(function(id){
				const todo = todos[id];
				return sortTable.some(function(id){
					return todo.id === id;
				});
			});

			//必要に応じてsortTableにデータを追加
			if(check === false){
				Object.keys(todos).forEach(function(id){
					const todo = todos[id];
					const exist = sortTable.some(function(id){
						return todo.id === id;
					});

					if(exist === false){
						sortTable.push(id);
					}
				});

				sortTable.save();
			}

			showList(todos, sortTable, query);

			$('.template-check').on('change', function(){
				//TODO チェックした/外したをDBに記録する
				const id = $(this).parents('.todo').find('.template-id').val();
				const checked = $(this).prop('checked');

				Todo.find(id).then(function(todo){
					todo.checked = checked;

					return Todo.update(id, todo);
				}).catch(function(){
					debugger;
				});
			});
		}).catch(function(){
			debugger;
		});
	}).catch(function(){
		debugger;
	});
}