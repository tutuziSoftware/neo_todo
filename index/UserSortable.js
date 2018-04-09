neo.UserSortable = class UserSortable{
	constructor(sort){
		this.DB = {
			NAME: "LocalTodoSortable",
			KEY: 'UserSortable',
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

	//UserSortable固有。
	some(f){
		return this.sort.some(f);
	}

	isExist(argId){
		return this.sort.some(function(id){
			return argId === id;
		});
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
		var db = localforage.createInstance({
			name: "LocalTodoSortable"
		});
		
		return new Promise(function(resolve, reject){
			db.getItem('UserSortable')
				.then(then)
				.catch(function(){
					//getItem的な失敗
					reject();
				})
				.then(then);

			function then(sort){
				if(sort === null){
					return db.setItem('UserSortable', []);
				}else{
					resolve(new UserSortable(sort));
				}
			}
		});
	}
}