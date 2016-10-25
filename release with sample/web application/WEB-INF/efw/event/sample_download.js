var sample_download={};
sample_download.name="ダウンロード";
sample_download.paramsFormat={"#cmb_download":"required:true;display-name:ダウンロードファイル"};
sample_download.fire=function(params){
	var ary_fl=params["#cmb_download"];
	var param;
	if (ary_fl.length==1){param=ary_fl[0];}else{param=ary_fl;}
	return (new Result())
		.attach(param)
		.deleteAfterDownload()
		.eval("Efw('sample_showfiles')");
};
