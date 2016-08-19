/**
 * The class to send mail.
 * 
 * @param {String}
 *            groupId: required<br>
 * @param {String}
 *            mailId: required<br>
 * @param {Object}
 *            params: required<br>
 *            {param1:value1,param2:value2,...}<br>
 * @author Chang Kejun
 */
function Mail(groupId, mailId, params) {
	this.groupId=groupId;
	this.mailId=mailId;
	this.params=params;
	efw.server.mail.send({
		"groupId" : groupId,
		"mailId" : mailId,
		"params" : params,
	});
};
/**
 * groupId from constructor
 */
Mail.prototype.groupId = null;
/**
 * mailId from constructor
 */
Mail.prototype.mailId = null;
/**
 * params from constructor
 */
Mail.prototype.params = null;
