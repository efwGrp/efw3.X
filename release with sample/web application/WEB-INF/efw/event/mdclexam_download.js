var mdclexam_download={};
mdclexam_download.name="ダウンロード";
mdclexam_download.outOfLogin=true;
mdclexam_download.paramsFormat={"#cmb_download":"required:true;display-name:ダウンロードファイル"};
mdclexam_download.fire=function(params){
	var ary_fl=params["#cmb_download"];
	var param;
	if (ary_fl.length==1){param=ary_fl[0];}else{param=ary_fl;}
	return (new Download())
		.attach(param)
		.deleteAfterDownload();
	// you can not concat a download event to another
};
