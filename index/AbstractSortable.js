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
		/**
		 * AbstractGroupSortable#push()を実行した時に割り当てられるキー名です。
		 * このキー名は継承先のクラスで書き換えることができます。
		 * @returns {number}
		 * @constructor
		 */
		static DEFAULT_PUSH_KEY_NAME(){
			return -1;
		};

		/**
		 * DBにデータがなかった場合、デフォルトで入る値です。
		 * @returns {{}}
		 * @constructor
		 */
		static FIRST_DB_DATA(){
			return {};
		};

		/**
		 * このクラスで使用するキー名を配列で返します。
		 * 配列の順番がgroupIdとして扱われます。
		 */
		static getGroupNames(){
			throw "配列でグループを定義してね";
		}

		getGroup(group){
			if(Array.isArray(this.sort[group]) === false){
				this.sort[group] = [];
			}

			return this.sort[group];
		}

		/**
		 * このメソッドはキーと格納された値を1単位としてデータを全て返します。
		 * @param callback
		 */
		forEachByGroup(callback){
			Object.keys(this.sort).forEach((groupId)=>{
				const group = this.sort[groupId];
				callback(group, groupId);
			});
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
			this.add(this.constructor.DEFAULT_PUSH_KEY_NAME(), todoId);
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
	};
})();