var mdclexam_inputcheck={};
mdclexam_inputcheck.name="入力チェック";
mdclexam_inputcheck.outOfLogin=true;
mdclexam_inputcheck.paramsFormat={
	"#txt_testtext":"required:true;display-name:テスト文字;max-length:5",
	"#txt_testnumber":"format:#,##0.00;required:true;display-name:テスト数字;min:-10.00;max:1,000.00",
	"#txt_testdate":
		function(){
			var date1=new Date();
			var date2=new Date();
			date2.setDate(date1.getDate()+Number(6));
			return "format:yyyy年MM月dd日;required:true;display-name:テスト日付;"
				+"min:"+efw.server.format.formatDate(date1,"yyyy年MM月dd日")+";"
				+"max:"+efw.server.format.formatDate(date2,"yyyy年MM月dd日")+";"
			;
		},
};
mdclexam_inputcheck.fire=function(params){};
