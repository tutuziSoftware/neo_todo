(function(){
	const DB_NAME = 'LocalTodoSortable';
	const DB_KEY  = 'PrioritySortable';

	//TODO 三つ目のSortableが出てきたらAbstractSortableとか作った方がいいかもね
	neo.PrioritySortable = class PrioritySortable{
		constructor(sort){
			this.db = localforage.createInstance({
				name: DB_NAME
			});

			//{
			//	'key':[],
			//	'key':[],
			// }
			this.sort = sort;
		}

		getPriority(priority){
			if(Array.isArray(this.sort[priority]) === false){
				this.sort[priority] = [];
			}

			return this.sort[priority];
		}

		isExist(todo){
			const prioritysKeys = Object.keys(this.sort);

			return prioritysKeys.some((key)=>{
				const priority = this.sort[key];
				return priority.some(function(id){
					return todo.id === id;
				});
			});
		}

		/**
		 * 優先度なしのTODOを登録します
		 */
		push(todoId){
			this.add(TODO_PRIORITY[1], todoId);
		}

		add(priority, todoId){
			if(Array.isArray(this.sort[priority]) === false){
				this.sort[priority] = [];
			}

			this.sort[priority].push(todoId);
		}

		save(){
			return this.db.setItem(DB_KEY, this.sort);
		}

		clear(){
			this.sort = {};
		}

		static new(){
			const db = localforage.createInstance({
				name: DB_NAME
			});
			const Class = this;

			return new Promise((resolve, reject)=>{
				db.getItem(DB_KEY)
				.then(then)
				.catch(function(){
					//getItem的な失敗
					reject();
				})
				.then(then);

				function then(sort){
					if(sort === null){
						return db.setItem(DB_KEY, {});
					}else{
						resolve(new Class(sort));
					}
				}
			});
		}
	};
})();