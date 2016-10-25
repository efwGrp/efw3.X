var sample_sendmail={};
sample_sendmail.name="メール送信";
sample_sendmail.paramsFormat={"#txt_to":"required:true;display-name:送信先;"};
sample_sendmail.fire=function(params){
	mail.send("mails","testmail",{"to":params["#txt_to"],"nowdate":new Date(),"username":"利用者"});
};
