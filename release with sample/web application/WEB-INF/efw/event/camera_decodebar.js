var camera_decodebar={};
camera_decodebar.name="Bar識別";
camera_decodebar.paramsFormat={"#file_image":null};
camera_decodebar.fire=function(params){
	file.remove("camera");
	file.saveUploadFiles("camera");
	var ary=file.list("camera");
	var msg="";
	if(ary.length>0){
		var fl=ary[0];
		msg=barcode.decode("camera/"+fl.name);
		if (msg==null)msg="識別できません。\nもう一回写真を撮ってください。";
	}
	file.remove("camera");
	return (new Result())
	.runat()
	.withdata({"textarea":msg});
};
