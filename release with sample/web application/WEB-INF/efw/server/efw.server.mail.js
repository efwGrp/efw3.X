/**
 * The class to send mail.
 * 
 * @author Chang Kejun
 */
var EfwServerMail = function() {
};
/**
 * The function to send mail.
 * @param executionParams
 *            <br> {<br>
 *            groupId:String,<br>
 *            mailId:String,<br>
 *            params:{param1:value1,param2:value2,...}<br> }
 */
EfwServerMail.prototype.send = function(executionParams) {
	var groupId = executionParams.groupId;
	var mailId = executionParams.mailId;
	var aryParam = executionParams.params;
	var params = new java.util.HashMap();
	for ( var key in aryParam) {
		if (key=="debug") continue;// debug function is skipped
		var vl = "" + aryParam[key];
		params.put(key, vl);
	}
	Packages.efw.mail.MailManager.send(groupId, mailId, params);
};
