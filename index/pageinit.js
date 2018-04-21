function indexPageInit(e){
	if(e.route.path !== '/neotodo/index.html') return;

	//TODO eの値に合わせてUserSortableを決定するように変更する
	//     変更後、tabShowイベントと統合できるかどうか確認する

	//ここはHTMLの表記の中で最初に表示すべきクラスを決定している。
	//HTMLが変更されるとここの挙動も変わるので注意。
	const sortableNameElement = $(".tabs [id*=Sortable]")[0];
	if(sortableNameElement === void 0) throw "開始するSortableが見つからなかったよ。HTML中にSortableなクラスを含めてね";
	const sortableClassName = sortableNameElement.id;
	if(sortableClassName === void 0) throw "id名にSortableのクラス名を含めてね";

	listController(neo[sortableClassName]);
}