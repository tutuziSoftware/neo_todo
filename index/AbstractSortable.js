(function(){
	neo.AbstractSortable = class{
		constructor(sort){
			//DBの値をそのまま格納
			this.sort = sort;
		}

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

		/**
		 * DBにデータがなかった場合、デフォルトで入れるデータです。
		 * @type {Array}
		 */
		static FIRST_DB_DATA(){
			throw "FIRST_DB_DATAを設定してね";
		};

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
						return db.setItem(IO_KEY, neo[IO_KEY].FIRST_DB_DATA());
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

	/**
	 * グループごとにソート順を決める基底クラスです
	 * @type {neo.AbstractGroupSortable}
	 */
	neo.AbstractGroupSortable = class AbstractGroupSortable extends neo.AbstractSortable{
		static FIRST_DB_DATA(){
			return {};
		};

		getGroup(group){
			if(Array.isArray(this.sort[group]) === false){
				this.sort[group] = [];
			}

			return this.sort[group];
		}

		getGroupNames(){
			return Object.keys(this.sort);
		}

		isExist(argId){
			const groupKeysList = Object.keys(this.sort);

			return groupKeysList.some((key)=>{
				const groupKeys = this.sort[key];
				return groupKeys.some(function(id){
					return argId === id;
				});
			});
		}

		/**
		 * グループなしのTODOを登録します
		 */
		push(todoId){
			const DEFAULT_GROUP = this._getConstGroups()[0];

			this.add(DEFAULT_GROUP, todoId);
		}

		add(priority, todoId){
			if(Array.isArray(this.sort[priority]) === false){
				this.sort[priority] = [];
			}

			this.sort[priority].push(todoId);
		}

		save(){
			return this._db.setItem(this._DB_KEY, this.sort);
		}

		clear(){
			this.sort = {};
		}

		_getConstGroups(){
			throw "配列でグループを定義してね";
		}
	};
})();