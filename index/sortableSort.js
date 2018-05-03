function sortableSort(html, move){
	//headerが存在した時、リストの相対位置を求める
	const headerLength = $(html).prevAll('li[id$="_list"]').length;
	const to = move.to - headerLength;
	const todoId = $(html).find('.template-id').val();
	const groupId = $(html).find('.template-group-id').val();

	var ClassName;
	$(html).parent().each(function(index, html){
		ClassName = neo[html.id];
	});

	const sortable = ClassName.new();
	sortable.then(function(sortable){
		const todoIndex = sortable.indexOf({
			todoId: todoId,
			groupId: groupId
		});
		//TODO ここはもともと配列で並び替える前提だった。今回の改修で、グループ分けに対応したい。
		//TODO また、合わせてグループをまたがって位置を変更する場合どうするかもここに書く。配列でも対応できるようにすること
		sortable.splice(todoIndex, 1);
		sortable.splice(to, 0, todoId);
		sortable.save();
	}).catch(function(){
		debugger;
	});
}