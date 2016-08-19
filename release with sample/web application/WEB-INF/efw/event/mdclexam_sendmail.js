var mdclexam_sendmail={};
mdclexam_sendmail.name="メール送信";
mdclexam_sendmail.outOfLogin=true;
mdclexam_sendmail.paramsFormat={"#txt_to":"required:true;display-name:送信先;"};
mdclexam_sendmail.fire=function(params){
	new Mail("mails","testmail",{"to":params["#txt_to"],"nowdate":new Date(),"username":"利用者"});
};
