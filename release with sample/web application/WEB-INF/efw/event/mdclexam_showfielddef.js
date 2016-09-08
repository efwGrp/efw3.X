var mdclexam_showfielddef={};
mdclexam_showfielddef.name="検査項目と判定情報表示";
mdclexam_showfielddef.paramsFormat={"fieldindex":null};
mdclexam_showfielddef.fire=function(params){
	var fieldindex=params["fieldindex"];
	//項目定義情報
	//-------------------------------------------------------------------------
	var rsFielddefinfo = (db.master("検査項目情報"))
		.seek("項目コード","eq",fieldindex)
		.map({
			"td:eq(0)":"項目コード",//これはmapping functionのテスト
			"td:eq(1)":"項目名称"
		}).getSingle();
	//項目定義リスト
	//-------------------------------------------------------------------------
	var rsFielddeflist = (db.master("判定情報"))
		.seek("項目コード","eq",fieldindex)
		.sort("男性・下限","asc")
		.map({
			"td1":"男性・下限",
			"td2":"男性・上限",
			"td3":"女性・下限",
			"td4":"女性・上限",
			"td5":"判定区分",
			"td6":"コメント",
			"td7":"指示コメント"
		}).getArray();

	return (new Result())
		.runat("#fielddefinfo")
		.withdata(rsFielddefinfo)
		.runat("#fielddeflist")
		.remove("tr")
		.append("<tr><td>{td1}</td><td>{td2}</td><td>{td3}</td><td>{td4}</td><td>{td5}</td><td>{td6}</td><td>{td7}</td></tr>")
		.withdata(rsFielddeflist)
		.eval("$('#fielddialog').show()");
};