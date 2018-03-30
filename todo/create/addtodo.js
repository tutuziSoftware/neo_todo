Dom7(document).on('page:afterout', '.page', function (e, page) {
	if(page.name != 'create') return;

	var title = $('[name="title"]', page.el).val();
	var id = 'local:'+(Date.now());

	Todo.create({
		id: id,
		title: title,
		date: Date.now(),
	}).then(function(){
		return Todo.getAll();
	}).then(function(todos){
		showTodoList(todos);
	});
});