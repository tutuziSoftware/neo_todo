const TODO_HEADER_SETTINGS = [
	{
		html_id: 'past_list',
		name: '過去',
	},
	{
		html_id: 'now_list',
		name: '今',
	},
	{
		html_id: 'today_list',
		name: '今日',
	},
	{
		html_id: 'future_list',
		name: 'いつかやる',
	},
];


const TODO_PRIORITY = (function(){
	/**
	 * TODO_PRIORITYの定数用クラス
	 */
	class TodoPriorityConst{
		constructor(id, name){
			if(Array.isArray(id)){
				this._id = id[0];
				this.idList = id;
			}else{
				this._id = id;
				this.idList = [id];
			}

			this.name = name;
		}

		get id(){
			return this._id;
		}

		toString(){
			return this.id+"";
		}

		equal(priorityId){
			return this.idList.some(function(id){
				return id == priorityId;
			});
		}
	}

	return {
		1: new TodoPriorityConst([1, void 0], '優先順なし'),
		2: new TodoPriorityConst(2, 'いつかやる'),
		4: new TodoPriorityConst(4, '今日やる'),
		8: new TodoPriorityConst(8, '今やる'),
		16: new TodoPriorityConst(16, '家でやる'),
	};
})();

const neo = {};