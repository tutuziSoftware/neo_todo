(function(){
	neo.AbstractSortable = class{
		isExist(id){
			throw 'isExistが未実装だよ';
		}

		push(){
			throw 'pushが未実装だよ';
		}

		save(){
			if(this.sort === void 0) throw 'Sortable.sortを実装するか、save()を書き換えてね';

			return this._db.setItem(this._DB_KEY, this.sort);
		}

		static new(){
			var db = localforage.createInstance({
				name: "LocalTodoSortable"
			});

			//継承したクラス名を元にDBのキーやインスタンス化
			const IO_KEY = this.name;

			return new Promise(function(resolve, reject){
				db.getItem(IO_KEY)
				.then(then)
				.catch(function(){
					//getItem的な失敗
					reject();
				})
				.then(then);

				function then(sort){
					if(sort === null){
						return db.setItem(IO_KEY, []);
					}else{
						const SortableClass = neo[IO_KEY];
						const instance = new SortableClass(sort, db);
						instance._db = db;
						instance._DB_KEY = IO_KEY;
						resolve(instance);
					}
				}
			});
		}
	};
})();