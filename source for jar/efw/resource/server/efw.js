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

/**
 * The global function to load application javascript file.
 */
function loadFile(filename) {
	if(!Efw.prototype._publicJsFiles.hasOwnProperty(filename)){
		_engine.eval(Packages.efw.script.ScriptManager.loadFile(filename));
		Efw.prototype._publicJsFiles[filename]={
			"from":"file",
			"filename":filename
		};
	}else if (_isdebug){
		_engine.eval(Packages.efw.script.ScriptManager.loadFile(filename));
	}
}
///////////////////////////////////////////////////////////////////////////////
//The class of efw
///////////////////////////////////////////////////////////////////////////////
/**
 * The Efw class
 */
function Efw() {
};
/**
 * The object to keep files.
 */
Efw.prototype._publicJsFiles = {};
/**
 * To show global info for debug.
 */
Efw.prototype.printGlobal = function(){
	var g = Function('return this')();
	for(var i in g){
		if (i!="debug"){
			java.lang.System.out.println("GLOBAL."+i);
		}
	}
};
/**
 * To add something into global scope from resource
 * The functions for clearing the difference of Nashorn 1.8 and Rhino 1.7 1.6
 */
Efw.prototype.loadResource = function(filename) {
	_engine.eval(Packages.efw.script.ScriptManager.loadResource(filename));
	Efw.prototype._publicJsFiles[filename]={
			"from":"resource",
			"filename":filename
		};
};
///////////////////////////////////////////////////////////////////////////////
//The classes of the framework
///////////////////////////////////////////////////////////////////////////////
/**
* To add something into global scope from file
* The functions for clearing the difference of Nashorn 1.8 and Rhino 1.7 1.6
*/
if (typeof this.JSON!="object"){
	Efw.prototype.loadResource("efw/script/json2.min.js");
}
/**
 * Add clone function to JSON for deep copy
 */
JSON.clone = function(obj,execFuncFlag) {
	if (obj === null || obj === undefined) { // null copy
		return obj;
	} else if (typeof obj == "function") { // function executed value
		if (execFuncFlag){
			return obj();
		}else{
			return obj;
		}
	} else if (typeof obj !== "object") { // simple value copy
		return obj;
	}
	if (obj instanceof Array) { // array deep copy
		var cloneA = [];
		for (var i = 0; i < obj.length; i++)
			cloneA[i] = JSON.clone(obj[i],execFuncFlag);
		return cloneA;
	}
	if (obj instanceof Date) { // date copy
		return new Date(obj);
	} else { // object deep copy
		var cloneO = {};
		for ( var key in obj){
			if (key=="debug") continue;// debug function is skipped
			cloneO[key] = JSON.clone(obj[key],execFuncFlag);
		}
		return cloneO;
	}
};
/**
 * Load all classes
 */
Efw.prototype.loadResource("efw/resource/server/efw.server.messages.js");
Efw.prototype.loadResource("efw/resource/server/efw.server.js");
Efw.prototype.loadResource("efw/resource/server/efw.server.format.js");
Efw.prototype.loadResource("efw/resource/server/efw.server.properties.js");
Efw.prototype.loadResource("efw/resource/server/efw.server.session.js");
Efw.prototype.loadResource("efw/resource/server/efw.server.db.js");
Efw.prototype.loadResource("efw/resource/server/efw.server.event.js");
Efw.prototype.loadResource("efw/resource/server/efw.server.file.js");
Efw.prototype.loadResource("efw/resource/server/efw.server.brms.js");
Efw.prototype.loadResource("efw/resource/server/efw.server.pdf.js");
Efw.prototype.loadResource("efw/resource/server/efw.server.mail.js");
Efw.prototype.loadResource("efw/resource/server/efw.server.record.js");
Efw.prototype.loadResource("efw/resource/server/efw.server.result.js");
Efw.prototype.loadResource("efw/resource/server/efw.server.excel.js");
Efw.prototype.loadResource("efw/resource/server/efw.server.batch.js");
Efw.prototype.loadResource("efw/resource/server/efw.server.cookie.js");
Efw.prototype.loadResource("efw/resource/server/efw.server.barcode.js");
Efw.prototype.loadResource("efw/resource/server/efw.server.debug.js");
Efw.prototype.loadResource("efw/resource/server/base64.min.js");
Efw.prototype.loadResource("efw/resource/server/efw.server.csv.js");
Efw.prototype.loadResource("efw/resource/server/efw.server.txt.js");
Efw.prototype.loadResource("efw/resource/server/efw.server.threads.js");
/**
 * create instances.
 */
var efw = new Efw();
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
	EfwServer.prototype.fire(EfwServerEvent.prototype._events["global"].event);
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
	var semaphore = null;// the semmaphore to control event maxrequests
	var semaphoreNeedRelease=false;// the flag about semmaphore release
	try{
		var eventInfo=EfwServerEvent.prototype._events[eventId];// to load or get a event
		if (eventInfo==null||eventInfo.from=="file"){
			eventInfo=EfwServerEvent.prototype._loadFromFile(eventId);
		}
		if (eventInfo==null){
			throw EfwServerMessages.prototype.EventIsNotExistsMessage;
		}
		var event=eventInfo.event;
		var service=eventInfo.service;
		semaphore=eventInfo.semaphore;
		semaphoreNeedRelease=false;
		if (params == null) {
			var ret = JSON.stringify(JSON.clone(event.paramsFormat,true));
			return ret;
		} else {
			//login check
			var ret = EfwServer.prototype.checkLogin(eventId);
			if (ret==null){
				// auth check
				ret = EfwServer.prototype.checkAuth(eventId);
				if (ret == null){
					ret = EfwServer.prototype.checkStyle(event, params);
					if (ret == null){
						if (semaphore==null){
							ret = EfwServer.prototype.fire(event, params);
						}else if(semaphore.tryAcquire()){
							semaphoreNeedRelease=true;
							ret = EfwServer.prototype.fire(event, params);
						}else{
							ret=(new Result()).error("EventIsBusyException",service);
						}
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
		if(semaphoreNeedRelease){
			semaphore.release();
		}
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