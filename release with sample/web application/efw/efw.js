/**
 * efw framework client library
 * @author Chang Kejun
 */
///////////////////////////////////////////////////////////////////////////////
//The classes of the framework
///////////////////////////////////////////////////////////////////////////////
/**
 * The Efw class
 */
var Efw = function() {
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
