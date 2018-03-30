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

const TODO_PRIORITY = {
	1: {
		id: 1,
		name: '優先順なし',
		toString:function(){
			return this.id+"";
		}
	},
	2: {
		id: 2,
		name: 'いつかやる',
		toString:function(){
			return this.id+"";
		}
	},
	4: {
		id: 4,
		name: '今日やる',
		toString:function(){
			return this.id+"";
		}
	},
	8: {
		id: 8,
		name: '今やる',
		toString:function(){
			return this.id+"";
		}
	},
	16: {
		id: 16,
		name: '家でやる',
		toString:function(){
			return this.id+"";
		}
	}
};

const neo = {};