neo.TagSortable = class TagSortable extends neo.AbstractGroupSortable{
	/**
	 * TagSortable#push()実行時、「タグなし」に値が入るように設定しました。
	 * @returns {number}
	 * @constructor
	 */
	static DEFAULT_PUSH_KEY_NAME(){
		return 0;
	};

	static getGroupNames(){
		return [
			"タグなし",
			"朝",
			"家→会社",
			"会社",
			"会社→家",
			"夜",
		];
	}

	/**
	 * グループなしのTODOを登録します。
	 * タグの場合、実データからタグ情報をこの関数で取得します。
	 */
	push(todoId){
		Todo.find(todoId).then((todo)=>{
			if(todo.tag === void 0 || todo.tag.length === 0){
				this.add(this.constructor.DEFAULT_PUSH_KEY_NAME(), todoId);
			}else{
				todo.tag.forEach((tagId)=>{
					this.add(tagId, todoId);
				});
			}

			//効率悪いし振る舞い的によくないけど、listController.jsでの使用は非同期を考慮していないのでここでsave
			this.save();
		}).catch(function(){
			throw "そんなtodoIdはないよ";
		});
	}
};