var mdclexam_mergepdf={};
mdclexam_mergepdf.name="PDFのマージ";
mdclexam_mergepdf.outOfLogin=true;
mdclexam_mergepdf.paramsFormat={};
mdclexam_mergepdf.fire=function(params){
	efw.server.pdf.merge("","merge.pdf");
	return mdclexam_showfiles.fire(params);
};
