/**** efw3.X Copyright 2016 efwGrp ****/
/**
 * The class to operate event.
 * 
 * @author Chang Kejun
 */
function EfwServerEvent() {
};
/**
 * The function to fire another event in an event firing.
 * 
 * @param {String}
 *            eventId: required<br>
 * @param {Object}
 *            params: optional<br>
 *            {param1:value1,param2:value2,...}<br>
 * @param {String}
 *            server: optional<br>
 *            The url of cors connections to another web server application constructed by Efw.<br>
 *            http://127.0.0.1:8080/efw<br>
 * @returns {Result}
 */
EfwServerEvent.prototype.fire = function(eventId, params, server) {
	if (server==undefined){
		if (params==undefined){
			params={};
		}else if(typeof(params) == "string"){
			server=params;
			params={};
		}
	}
	
	var result=new Result();
	if (server==undefined){
		var eventInfo=EfwServerEvent.prototype._events[eventId];
		if (eventInfo==null||eventInfo.from=="file"){
			eventInfo=EfwServerEvent.prototype._loadFromFile(eventId);
		}
		result=eventInfo.event.fire(params);
	}else{
		var servletUrl = "efwServlet";
		var jsonString=""+Packages.efw.event.RemoteEventManager.call(
				server+"/"+servletUrl,
				JSON.stringify({eventId:eventId,params:params})
			);
		var resultJSON=JSON.parse(jsonString);
		if (resultJSON.actions!=null&&resultJSON.values!=null){
			result.actions=resultJSON.actions;
			result.values=resultJSON.values;
		}else{
			result=resultJSON;
		}
	}
	return result;
};
///////////////////////////////////////////////////////////////////////////////
/**
 * The locker for event operating.
 */
var Event_lock = new java.util.concurrent.locks.ReentrantLock();
/**
 * The object to keep events.
 */
EfwServerEvent.prototype._events = {};
/**
 * 
 * @param resourcePath
 * @param eventId
 */
EfwServerEvent.prototype._loadFromResource = function(resourcePath,eventId) {
	EfwServerEvent.prototype._events[eventId] = {
		"event" :  eval(Packages.efw.script.ScriptManager.loadResource(resourcePath + "/" + eventId + ".js")
				+";(" + 
				function(){var folderAry=eventId.split("/");return folderAry[folderAry.length-1];}()
				+ ")"),
		"from":"resource",
		"path":resourcePath,
		"eventId":eventId,
	};
	return EfwServerEvent.prototype._events[eventId];
};

/**
 * The function to load a event.<br>
 * If the debug mode,load event every time.<br>
 * If the release mode, load event only the first time.<br>
 * If the event is from resource,do not reload it.<br>
 * @param {String}
 *            eventId: required<br>
 * @returns {EventInfo}
 */
EfwServerEvent.prototype._loadFromFile = function(eventId) {
	Event_lock.lock();
	try {
		//if the event hasnot be loaded, load it.
		if(EfwServerEvent.prototype._events[eventId]==null){
			if ("global"==eventId){
				_engine.eval(Packages.efw.script.ScriptManager.loadFile(_eventfolder + "/" + eventId + ".js"));
				EfwServerEvent.prototype._events[eventId] = {
						"event" :  eval("(" + 
								function(){var folderAry=eventId.split("/");return folderAry[folderAry.length-1];}()
								+ ")"),
						"from":"file",
						"path":_eventfolder,
						"eventId":eventId,
					};
				if (EfwServerEvent.prototype._events[eventId].event==null)EfwServerEvent.prototype._events[eventId]=null;
			}else{
				EfwServerEvent.prototype._events[eventId] = {
						"event" :  eval(Packages.efw.script.ScriptManager.loadFile(_eventfolder + "/" + eventId + ".js")
								+";(" + 
								function(){var folderAry=eventId.split("/");return folderAry[folderAry.length-1];}()
								+ ")"),
						"from":"file",
						"path":_eventfolder,
						"eventId":eventId,
						"service":null,
						"semaphore":null,
					};
				if (EfwServerEvent.prototype._events[eventId].event==null){
					EfwServerEvent.prototype._events[eventId]=null;
				}else{
					EfwServerEvent.prototype._setService(EfwServerEvent.prototype._events[eventId]);
				}
			}
		}else if (_isdebug){
			EfwServerEvent.prototype._events[eventId].event=eval(Packages.efw.script.ScriptManager.loadFile(_eventfolder + "/" + eventId + ".js")
					+";(" + 
					function(){var folderAry=eventId.split("/");return folderAry[folderAry.length-1];}()
					+ ")");
			if (EfwServerEvent.prototype._events[eventId].event==null){
				EfwServerEvent.prototype._events[eventId]=null;
			}else{
				EfwServerEvent.prototype._setService(EfwServerEvent.prototype._events[eventId]);
			}
		}
	}catch(e){
		java.lang.System.out.println(e);
		EfwServerEvent.prototype._events[eventId]=null;
	} finally {
		Event_lock.unlock();
	}
	return EfwServerEvent.prototype._events[eventId];
};
/**
 * This function to set eventinfo about service
 * @param eventInfo
 */
EfwServerEvent.prototype._setService=function(eventInfo){
	var event=eventInfo.event;
	if (event!=null&&event.service!=null){
		var service=event.service;
		if (eventInfo.service==null)eventInfo.service={};
		if(service.max!=null && service.max!=eventInfo.service.max){
			if(service.max>-1){
				eventInfo.semaphore=new java.util.concurrent.Semaphore(service.max); 
			}else{
				eventInfo.semaphore=null;
			}
		}
		eventInfo.service=service;
	}else{
		eventInfo.service=null;
		eventInfo.semaphore=null;
	}
};

