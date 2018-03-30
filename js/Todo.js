//TODOを格納する為のO/Rマッパー的なもの
class Todo{
	static create(data){
		var db = localforage.createInstance({
			name: "localtodos"
		});

		return db.setItem(data.id, data);
	}

	static getAll(){
		var db = localforage.createInstance({
			name: "localtodos"
		});

		return new Promise(function(resolve, reject){
			var todos = {};

			db.iterate(function(todo){
				todos[todo.id] = todo;
			}).then(function(){
				resolve(todos);
			}).catch(function(){
				reject();
			});
		});
	}

	static find(id){
		var db = localforage.createInstance({
			name: "localtodos"
		});

		return db.getItem(id);
	}

	static update(id, todo){
		var db = localforage.createInstance({
			name: "localtodos"
		});

		return db.setItem(id, todo);
	}

	static clear(){
		var db = localforage.createInstance({
			name: "localtodos"
		});

		return db.clear();
	}
}