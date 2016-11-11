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

Efw.prototype.result=null;
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
/**
 * Set jQuery UI dialog to fixed position.
 */
$.ui.dialog.prototype._oldinit = $.ui.dialog.prototype._init;
$.ui.dialog.prototype._init = function() {
    $(this.element).parent().css('position', 'fixed');
    $(this.element).dialog("option",{
        resizeStop: function(event,ui) {
            var position = [(Math.floor(ui.position.left) - $(window).scrollLeft()),
                            (Math.floor(ui.position.top) - $(window).scrollTop())];
            $(event.target).parent().css('position', 'fixed');
            $(event.target).dialog('option','position',position);
            return true;
        }
    });
    this._oldinit();
};
