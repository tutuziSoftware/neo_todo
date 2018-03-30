function sortableSort(html, move){
	//headerが存在した時、リストの相対位置を求める
	const headerLength = $(html).prevAll('li[id$="_list"]').length;
	const to = move.to - headerLength;
	const todoId = $(html).find('.template-id').val();

	var ClassName;
	$(html).parent().each(function(index, html){
		ClassName = neo[html.id];
	});

	const sortable = ClassName.new();
	sortable.then(function(sortable){
		const todoIndex = sortable.indexOf(todoId);
		sortable.splice(todoIndex, 1);
		sortable.splice(to, 0, todoId);
		sortable.save();
	}).catch(function(){
		debugger;
	});
}