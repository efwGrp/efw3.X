var sample_upload={};
sample_upload.name="ファイルアップロード";
sample_upload.paramsFormat={
	"#txt_file1":"required:true;display-name:ファイル１;accept:xls;",
	"#txt_file2":"display-name:ファイル２;accept:XLS,xlsx;",
};
sample_upload.fire=function(params){
	file.saveUploadFiles("");
	
	return (new Result)
		.runat("body")
		.withdata({"#txt_file1":"","#txt_file2":"",})
		.concat(event.fire("sample_showfiles",params));
};
