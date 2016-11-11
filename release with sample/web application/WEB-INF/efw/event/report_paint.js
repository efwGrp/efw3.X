var report_paint={};
report_paint.name="帳票作成";
report_paint.paramsFormat={};
report_paint.fire=function(params){
	return (new Result())
	.runat("body")
	.withdata({"#txt_createtime":(new Date()).format("yyyy-MM-dd HH:mm:ss")});
};
