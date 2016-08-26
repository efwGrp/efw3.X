/**
 * efw framework client library
 * @author Chang Kejun
 */
///////////////////////////////////////////////////////////////////////////////
//The classes of the framework
///////////////////////////////////////////////////////////////////////////////
/**
 * The Efw class
 * Efw(eventId)<br>
 * Efw(eventId,manualParams)<br>
 * Efw(eventId,success)<br>
 * Efw(eventId,manualParams,success)<br>
 * <br>
 * success=function(values,actions){}
 */
var Efw = function(eventId,manualParams,success) {
	if(eventId!=undefined){
		var eventParams={"eventId":eventId};
		if(typeof manualParams =="function" && success==null) {
			eventParams.success=manualParams;
		}else{
			eventParams.manualParams=manualParams;
			eventParams.success=success;
		}
		efw.client.fire(eventParams);
	}
};
Efw.prototype.client=new EfwClient();
EfwClient.prototype.format = new EfwClientFormat();
EfwClient.prototype.messages = new EfwClientMessages();
// /////////////////////////////////////////////////////////////////////////////
// The initialization of system.
// /////////////////////////////////////////////////////////////////////////////
/**
 * efw is an instance of Efw.<br>
 * all using of framework base functions in your program should be started from
 * it.
 */
var efw = new Efw();
/**
 * Enable cors.
 */
jQuery.support.cors = true;
/**
 * Add events for input behaviors.
 */
$(function() {
	window.onhelp = efwClientInputBehavior.prototype.unDohelp;
	$(document).keydown(efwClientInputBehavior.prototype.DoShortcut);
	$(":text,:password,:radio,:checkbox,select,textarea").focus(
			efwClientInputBehavior.prototype.DoFocus).blur(
			efwClientInputBehavior.prototype.DoBlur);
	$("[data-format]").focus(efwClientInputBehavior.prototype.DoFormatFocus)
			.blur(efwClientInputBehavior.prototype.DoFormatBlur);
});
