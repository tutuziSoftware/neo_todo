neo.PrioritySortable = class PrioritySortable{
	constructor(sort){
		this.DB = {
			NAME: "LocalTodoSortable",
			KEY: 'PrioritySortable',
		};
		this.sort = [];

		if(Array.isArray(sort)){
			sort.forEach((s)=>{
				this.sort.push(s);
			});
		}
	}

	forEach(f){
		this.sort.forEach(f);
	}

	some(f){
		return this.sort.some(f);
	}

	push(id){
		this.sort.push(id);
	}

	indexOf(id){
		return this.sort.indexOf(id);
	}

	splice(){
		return this.sort.splice.apply(this.sort, arguments);
	}

	save(){
		var db = localforage.createInstance({
			name: this.DB.NAME
		});

		return db.setItem(this.DB.KEY, this.sort);
	}

	static new(){
		const db = localforage.createInstance({
			name: "LocalTodoSortable"
		});
		const Class = this;

		return new Promise(function(resolve, reject){
			db.getItem('PrioritySortable')
			.then(then)
			.catch(function(){
				//getItem的な失敗
				reject();
			})
			.then(then);

			function then(sort){
				if(sort === null){
					return db.setItem('PrioritySortable', []);
				}else{
					resolve(new Class(sort));
				}
			}
		});
	}
};