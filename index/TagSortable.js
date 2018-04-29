neo.TagSortable = class TagSortable extends neo.AbstractGroupSortable{
	/**
	 * TagSortable#push()実行時、「タグなし」に値が入るように設定しました。
	 * @returns {number}
	 * @constructor
	 */
	static DEFAULT_PUSH_KEY_NAME(){
		return 0;
	};

	static getGroupNames(){
		return [
			"タグなし",
			"朝",
			"家→会社",
			"会社",
			"会社→家",
			"夜",
		];
	}
};