function indexPageInit(e){
	if(e.route.path !== '/neotodo/index.html') return;

	//TODO eの値に合わせてUserSortableを決定するように変更する
	//     変更後、tabShowイベントと統合できるかどうか確認する

	listController(neo.UserSortable);
}