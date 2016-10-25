var mdclexam_changedb={};
mdclexam_changedb.name="検査項目のDB情報更新";
mdclexam_changedb.paramsFormat={"#fielddefinfo":{"td:eq(0)":"format:0","td:eq(1)":null}};
mdclexam_changedb.fire=function(params){
	var cd=params["#fielddefinfo"]["td:eq(0)"];
	var nm=params["#fielddefinfo"]["td:eq(1)"];
	if (nm.substring(0, 2)=="変更"){
		nm=nm.substring(2);
	}else{
		nm="変更"+nm;
	}
	//db.change("update 検査項目情報 set 項目名称 ='"+nm+"' where 項目コード ='"+cd+"' ");
	db.change("mdclexam_fielddef","update",{"cd":cd,"nm":nm,});
	return (new Result()).alert("項目名のDB内容を更新しました。");
};
