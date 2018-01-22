/**** efw3.X Copyright 2016 efwGrp ****/
/**
 * efw framework server library
 * @author Chang Kejun
 */
///////////////////////////////////////////////////////////////////////////////
//The global variables created from java.
///////////////////////////////////////////////////////////////////////////////
/**
 * The event folder absolute path.
 */
//var _eventfolder;
/**
 * The boolean flag to show the mode is debug or not.
 */
//var _isdebug;
/**
 * The javascript engine.
 */
//var _engine;// Mozilla Rhino 1.7 / Oracle Nashorn 1.8

// /////////////////////////////////////////////////////////////////////////////
// The customization to javax.script
// /////////////////////////////////////////////////////////////////////////////
/**
 * To add something into global scope.
 * The functions for clearing the difference of Nashorn 1.8 and Rhino 1.7 1.6
 */
function loadResource(filename) {
	_engine.eval(Packages.efw.script.ScriptManager.loadResource(filename));
}
function loadFile(filename) {
	_engine.eval(Packages.efw.script.ScriptManager.loadFile(filename));
}
if (typeof this.JSON!="object"){
	loadResource("efw/script/json2.min.js");
}

/**
 * Add clone function to JSON for deep copy
 */
JSON.clone = function(obj) {
	if (obj === null || obj === undefined) { // null copy
		return obj;
	} else if (typeof obj == "function") { // function executed value
		return obj();
	} else if (typeof obj !== "object") { // simple value copy
		return obj;
	}
	if (obj instanceof Array) { // array deep copy
		var cloneA = [];
		for (var i = 0; i < obj.length; i++)
			cloneA[i] = JSON.clone(obj[i]);
		return cloneA;
	}
	if (obj instanceof Date) { // date copy
		return new Date(obj);
	} else { // object deep copy
		var cloneO = {};
		for ( var key in obj){
			if (key=="debug") continue;// debug function is skipped
			cloneO[key] = JSON.clone(obj[key]);
		}
		return cloneO;
	}
};
// /////////////////////////////////////////////////////////////////////////////
// The classes of the framework
// /////////////////////////////////////////////////////////////////////////////
/**
 * The Efw class
 */
function Efw() {
};
/**
 * Load all classes
 */
loadResource("efw/resource/server/efw.server.messages.js");
loadResource("efw/resource/server/efw.server.js");
loadResource("efw/resource/server/efw.server.format.js");
loadResource("efw/resource/server/efw.server.properties.js");
loadResource("efw/resource/server/efw.server.session.js");
loadResource("efw/resource/server/efw.server.db.js");
loadResource("efw/resource/server/efw.server.event.js");
loadResource("efw/resource/server/efw.server.file.js");
loadResource("efw/resource/server/efw.server.brms.js");
loadResource("efw/resource/server/efw.server.pdf.js");
loadResource("efw/resource/server/efw.server.mail.js");
loadResource("efw/resource/server/efw.server.record.js");
loadResource("efw/resource/server/efw.server.result.js");
loadResource("efw/resource/server/efw.server.excel.js");
loadResource("efw/resource/server/efw.server.batch.js");
loadResource("efw/resource/server/efw.server.cookie.js");
loadResource("efw/resource/server/efw.server.barcode.js");
loadResource("efw/resource/server/efw.server.debug.js");
loadResource("efw/resource/server/base64.min.js");
/**
 * create instances.
 */
var properties = new EfwServerProperties();
var session = new EfwServerSession();
var db = new EfwServerDb();
var event = new EfwServerEvent();
var file = new EfwServerFile(false);
var absfile = new EfwServerFile(true);
var brms = new EfwServerBRMS();
var mail =new EfwServerMail();
var pdf = new EfwServerPdf();
var cookie =new EfwServerCookie();
var barcode =new EfwServerBarcode();

// /////////////////////////////////////////////////////////////////////////////
// The initialization of system.
// /////////////////////////////////////////////////////////////////////////////

/**
 * Run global event.
 */
if (EfwServerEvent.prototype._loadFromFile("global") != null)
	EfwServer.prototype.fire(EfwServerEvent.prototype._loadFromFile("global").event);
// /////////////////////////////////////////////////////////////////////////////
/**
 * The ajax service function<br>
 * It will be called by efwServlet
 * 
 * @param req:
 *            JSON String from client
 * @returns: JSON String to client
 */
function doPost(req) {
	var reqJson = JSON.parse(req); // parse request string to json object
	var eventId = reqJson.eventId; // get eventId from json object
	var params = reqJson.params; // get params from json object
	try{
		var eventInfo=EfwServerEvent.prototype._events[eventId];// to load or get a event
		if (eventInfo==null||eventInfo.from=="file"){
			eventInfo=EfwServerEvent.prototype._loadFromFile(eventId);
		}
		if(eventInfo.enable==false){
			var message=EfwServerMessages.prototype.EventDisableMessage;
			return JSON.stringify(
					(new Result())
					.alert(message,{"eventId":eventId}));
		}
		var event=eventInfo.event;
		var beginTime = new Date(); // the begin time of event calling
		if (params == null) {
			var ret = JSON.stringify(JSON.clone(event.paramsFormat));
			var endTime = new Date(); // the end time of event first calling
			EfwServerEvent.prototype._updateStatistics(eventId, "first", beginTime,
					endTime);
			return ret;
		} else {
			//login check
			var ret = EfwServer.prototype.checkLogin(eventId);
			if (ret==null){
				// auth check
				ret = EfwServer.prototype.checkAuth(eventId);
				if (ret == null){
					var fireFlag = "error"; // the second calling is error
					ret = EfwServer.prototype.checkStyle(event, params);
					try {
						if (ret == null)
							ret = EfwServer.prototype.fire(event, params);
						fireFlag = "second"; // the second calling is success
					} finally {
						var endTime = new Date(); // the end time of event second calling
						EfwServerEvent.prototype._updateStatistics(eventId, fireFlag,
								beginTime, endTime);
					}
				} 
			}
			// if it is null, return blank array to client as a success
			if (ret == null) ret=new Result();
			
			// change data to string and return it to client
			return JSON.stringify(ret);
		}
	}catch(e){
		var result=(new Result())
		.error("RuntimeErrorException", {"eventId":eventId,"message":""+e});
		var systemErrorUrl=EfwServerProperties.prototype.get("efw.system.error.url","error.jsp");
		if (systemErrorUrl!=""){
			result.navigate(systemErrorUrl);
		}
		return JSON.stringify(result);
	}finally{
		//remove all uploaded files when event over
		Packages.efw.file.FileManager.removeUploadFiles();
	}
};
///////////////////////////////////////////////////////////////////////////////
/**
 * The service function<br>
 * It will be called by efwBatch
 * 
 * @param req:
 *            JSON String from batch
 * @returns: JSON String to batch
 */
function doBatch(req) {
	var reqJson = JSON.parse(req); // parse request string to json object
	var eventId = reqJson.eventId; // get eventId from json object
	var params = reqJson.params; // get params from json object
	try{
		var eventInfo=EfwServerEvent.prototype._events[eventId];// to load or get a event
		if (eventInfo==null||eventInfo.from=="file"){
			eventInfo=EfwServerEvent.prototype._loadFromFile(eventId);
		}
		var event=eventInfo.event;
		var ret = EfwServer.prototype.fire(event, params);
		// if it is null, return blank array to client as a success
		if (ret == null) ret=new Result();
		// change data to string and return it to client
		return JSON.stringify(ret);
	}catch(e){
		var result=(new Result())
		.error("RuntimeErrorException", {"eventId":eventId,"message":""+e});
		return JSON.stringify(result);
	}
};