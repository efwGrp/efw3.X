var mdclexam_upload={};
mdclexam_upload.name="ファイルアップロード";
mdclexam_upload.outOfLogin=true;
mdclexam_upload.paramsFormat={
	"#txt_file1":"required:true;display-name:ファイル１;accept:xls;",
	"#txt_file2":"display-name:ファイル２;accept:XLS,xlsx;",
};
mdclexam_upload.fire=function(params){
	efw.server.file.saveUploadFiles("");
	
	return (new Result)
		.runat("body")
		.withdata({"#txt_file1":"","#txt_file2":"",})
		.concat(mdclexam_showfiles.fire(params));
};
