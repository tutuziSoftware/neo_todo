(function(){
	const DB_NAME = 'LocalTodoSortable';
	const DB_KEY  = 'PrioritySortable';

	neo.PrioritySortable = class PrioritySortable{
		constructor(sort){
			this.db = localforage.createInstance({
				name: DB_NAME
			});

			this.sort = sort;
		}

		getPriority(priority){
			if(Array.isArray(this.sort[priority]) === false){
				this.sort[priority] = [];
			}

			return this.sort[priority];
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