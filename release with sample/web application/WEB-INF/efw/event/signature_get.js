var signature_get={};
signature_get.name="手書きサイン　取得";
signature_get.paramsFormat={"#signature1":null};
signature_get.fire=function(params){
	return (new Result())
	.eval("$('#imgDest').attr('src','data:image/svg+xml;base64,"+params["#signature1"].base64Encode()+"');");
};
