var app = new Framework7({
	// App root element
	root: '#app',
	// App Name
	name: '新TODO',
	// App id
	id: 'App idとは？',
	// Enable swipe panel
	panel: {
		swipe: 'left',
	},
	// Add default routes
	routes: [
		{
			path: '/edit/',
			url: 'todo/edit/edit.html',
		},
		{
			path: '/create/',
			url: 'todo/create/create.html',
		}
	],
	on: {
		//TODO ここら辺はグローバル変数の配列にデータ入れる→ループして実行　という風にしたらここを書き換える必要がなくなる
		pageInit: (e)=>{ [indexPageInit, editPageInit].forEach((f)=>f(e)) },
		pageReinit: indexPageInit,
		pageBeforeOut: beforeOut,
		sortableSort: sortableSort,
		tabShow: tabShow,
	}
});

var mainView = app.views.create('.view-main');

app.sortable.enable('#sortable_list');
app.sortable.enable('#priority_list');
app.sortable.enable('#tag_list');