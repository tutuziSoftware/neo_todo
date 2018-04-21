neo.TagSortable = class TagSortable extends neo.AbstractGroupSortable{
	_getConstGroups(){
		return [
			"朝",
			"家→会社",
			"会社",
			"会社→家",
			"夜",
		];
	}
};