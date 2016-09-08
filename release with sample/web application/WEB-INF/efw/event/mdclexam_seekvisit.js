var mdclexam_seekvisit={};
mdclexam_seekvisit.name="受診情報検索";
mdclexam_seekvisit.paramsFormat={"#the_id":null,"visitdate":"format:yyyy/MM/dd"};
mdclexam_seekvisit.fire=function(params){
	var visitdate=params["visitdate"];
	//受診情報
	//-------------------------------------------------------------------------
	var rsVisitinfo=(db.select("mdclexam_visit","select",{"user_id":params["#the_id"],"visit_date":visitdate}))
		.map({
			"td:eq(0)":["受診日","yyyy/MM/dd"],
			"td:eq(1)":"コース名",
			"td:eq(2)":function(rs){
				var j=rs["状態"];
				if(j==0) return "予約";
				else if(j==1) return "受付";
				else if(j==2) return "入力途中";
				else if(j==3) return "入力完了";
				else return "";
			},
			"td:eq(3)":function(rs){
				var h=rs["保険区分"];
				if(h==1) return "本人";
				else if(h==2) return "家族(配偶者)";
				else return "";
			},
			"td:eq(4)":function(rs){
				var t=rs["治療中"];
				if(t==1) return "治療中";
				else return "";
			},
			"td:eq(5)":"総合判定",
			"td:eq(6) div":"備考(※)",
			"td:eq(7) div":"メモ",
			"td:eq(8)":"整理番号",
			"td:eq(9)":"保険事務所",
			"td:eq(10)":"保険記号",
			"td:eq(12)":"保険番号",
			"td:eq(13)":"団体漢字名称",
			"td:eq(15)":["請求金額（団体","###,##0"],
			"td:eq(16)":["請求金額（個人","###,##0"],
			"td:eq(17)":["請求金額（割引","###,##0"],
			"td:eq(18)":["税額（団体","###,##0"],
			"td:eq(19)":["税額（個人","###,##0"]			
		})
		.getSingle();
	
	//受診結果
	//-------------------------------------------------------------------------
	var rsSubdata1 = (db.select("mdclexam_field","list",{"user_id":params["#the_id"],"visit_date":visitdate}))
		.map({
			"td1":"検査項目番号",
			"td2":"項目名称",
			"td3":function(rs){
				if(rs["データタイプ"]<=3) return rs["数値結果"];
				else return rs["文字結果"];
			},
			"align":function(rs){
				if(rs["データタイプ"]<=3) return "right";
				else return "left";
			},
			"td4":"判定区分"
		})
		.getArray();
	
	//オプション受診歴
	//-------------------------------------------------------------------------
	//コース名を取得する、内部関数
	function getCouseName(cd){
		return (db.master("オプションコース情報"))
		.seek("コース番号","eq",cd)
		.getValue("オプションコース名");
	}
	var rsOptioninfo = (db.select("mdclexam_option","seek",{"user_id":params["#the_id"],"visit_date":visitdate}))
		.map({
			"td:eq(0)":function(rs){return getCouseName(rs["コース番号1"]);},
			"td:eq(1)":function(rs){return getCouseName(rs["コース番号2"]);},
			"td:eq(2)":function(rs){return getCouseName(rs["コース番号3"]);},
			"td:eq(3)":function(rs){return getCouseName(rs["コース番号4"]);},
			"td:eq(4)":function(rs){return getCouseName(rs["コース番号5"]);},
			"td:eq(5)":function(rs){return getCouseName(rs["コース番号6"]);},
			"td:eq(6)":function(rs){return getCouseName(rs["コース番号7"]);},
			"td:eq(7)":function(rs){return getCouseName(rs["コース番号8"]);},
			"td:eq(8)":function(rs){return getCouseName(rs["コース番号9"]);},
			"td:eq(9)":function(rs){return getCouseName(rs["コース番号10"]);},
		})
		.getSingle();

	//指示指導情報
	//-------------------------------------------------------------------------
	var rsInstructionlist = (db.select("mdclexam_instruction","list",{"user_id":params["#the_id"],"visit_date":visitdate}))
		.map({
			"td1":"印字・表示順番",
			"td2":"指示コメントの表題",
			"td3":"指示コメント(※)"
		})
		.getArray();
	
	return (new Result())
		.runat("#visitinfo")
		.withdata(rsVisitinfo)
		.runat("#subdata1")
		.remove("tr")
		.append("<tr style='cursor:pointer' onclick='showFieldDialog({td1})' id='field_{td1}'><td>{td1}</td><td>{td2}</td><td style='text-align:{align}'>{td3}</td><td style='text-align:center'>{td4}</td></tr>")
		.withdata(rsSubdata1)
		.runat("#optioninfo")
		.withdata(rsOptioninfo)
		.runat("#instructionlist")
		.remove("tr")
		.append("<tr><td>{td1}</td><td>{td2}</td><td style='white-space:normal;'>{td3}</td></tr>")
		.withdata(rsInstructionlist);
};