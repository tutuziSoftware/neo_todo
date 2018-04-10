(function(){
	neo.NeoSortable = class NeoSortable extends neo.AbstractSortable{
		constructor(sort){
			super();

			this.sort = [];

			if(Array.isArray(sort)){
				sort.forEach((s)=>{
					this.sort.push(s);
				});
			}
		}

		isExist(argId){
			return this.sort.some(function(id){
				return argId === id;
			});
		}

		push(id){
			this.sort.push(id);
		}

		forEach(f){
			return this.sort.forEach(f);
		}
	};
})();