/**** efw3.X Copyright 2016 efwGrp ****/
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
 * Efw(eventId,sever)<br>
 * Efw(eventId,manualParams,sever)<br>
 */
var Efw = function(eventId,manualParams,server) {
	if(eventId!=undefined){
		var eventParams={"eventId":eventId};
		if(typeof manualParams =="string") {
				eventParams.server=manualParams;
		}else{
			eventParams.manualParams=manualParams;
			eventParams.server=server;
		}
		EfwClient.prototype.fire(eventParams);
	}
};

Efw.prototype.baseurl = ".";
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
	$(document).on("keydown",efwClientInputBehavior.prototype.DoShortcut);
	$(document).on("focus",":text,:password,:radio,:checkbox,select,textarea",efwClientInputBehavior.prototype.DoFocus);
	$(document).on("blur",":text,:password,:radio,:checkbox,select,textarea",efwClientInputBehavior.prototype.DoBlur);
	$(document).on("focus","[data-format]",efwClientInputBehavior.prototype.DoFormatFocus);
	$(document).on("blur","[data-format]",efwClientInputBehavior.prototype.DoFormatBlur);
});

