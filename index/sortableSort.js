function sortableSort(html, move){
	//headerが存在した時、リストの相対位置を求める
	const headerLength = $(html).prevAll('li[id$="_list"],li[id^="tag_"]').length;
	const to = move.to - headerLength;
	const todoId = $(html).find('.template-id').val();
	const fromGroupId = $(html).find('.template-group-id').val();
	const toGroupId = (function(){
		var tagHeaderDOM = $(html).prevAll('li[id^="tag_"]')[0];

		if(tagHeaderDOM === void 0){
			return null;
		}else{
			const tagId = tagHeaderDOM.id.match(/tag_([0-9]*)/)[1];
			return tagId !== void 0 ? tagId : null;
		}
	})();

	var ClassName;
	$(html).parent().each(function(index, html){
		ClassName = neo[html.id];
	});

	const sortable = ClassName.new();
	sortable.then(function(sortable){
		//TODO headerをまたいだ時、toが正しくないのでリロードすると位置が変わる
		const index = sortable.indexOf({
			todoId: todoId,
			groupId: fromGroupId
		});
		sortable.move({
			from:{
				groupId:fromGroupId,
				index:index
			},
			to:{
				groupId:toGroupId,
				index:to
			}
		});

		//groupIdが変更になった場合、todo.tagも変更する必要がある。暫定的にここで対応。配列の場合はここは無視されればここでOK
		if(fromGroupId !== toGroupId){
			Todo.find(todoId).then(function(todo){
				todo.tag = toGroupId;
				Todo.update(todo.id, todo);
			}).catch(function(){
				throw "そんなTODOないよ";
			});
		}

		sortable.save();
	}).catch(function(){
		debugger;
	});
}