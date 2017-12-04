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
 *            params: required<br>
 *            {param1:value1,param2:value2,...}<br>
 * @returns {Result}
 */
EfwServerEvent.prototype.fire = function(eventId, params) {
	var result=new Result();
	var beginTime = new Date();
	var fireFlag = "error";
	try {
		var eventInfo=EfwServerEvent.prototype._events[eventId];
		if (eventInfo==null||eventInfo.from=="file"){
			eventInfo=EfwServerEvent.prototype._loadFromFile(eventId);
		}
		result=eventInfo.event.fire(params);
		fireFlag = "second";
	} finally {
		var endTime = new Date();
		EfwServerEvent.prototype._updateStatistics(eventId, fireFlag, beginTime,
				endTime);
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
	var folderAry=eventId.split("/");
	var jsId=folderAry[folderAry.length-1];
	loadResource(resourcePath + "/" + eventId + ".js");
	var event = eval("(" + jsId + ")");
	EfwServerEvent.prototype._events[eventId] = {
			"event" : event,
			"enable" : true,
			"first" : {
				"count" : 0,
				"sum" : 0,
				"avg" : 0,
				"max" : 0,
				"min" : 0
			},
			"second" : {
				"count" : 0,
				"sum" : 0,
				"avg" : 0,
				"max" : 0,
				"min" : 0
			},
			"error" : {
				"count" : 0,
				"sum" : 0,
				"avg" : 0,
				"max" : 0,
				"min" : 0
			},
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
	var folderAry=eventId.split("/");
	var jsId=folderAry[folderAry.length-1];
	var eventInfo;
	Event_lock.lock();
	try {
		//if the event hasnot be loaded, load it.
		if(!EfwServerEvent.prototype._events.hasOwnProperty(eventId)){
			loadFile(_eventfolder + "/" + eventId + ".js");
			var event = eval("(" + jsId + ")");
			EfwServerEvent.prototype._events[eventId] = {
				"event" : event,
				"enable" : true,
				"first" : {
					"count" : 0,
					"sum" : 0,
					"avg" : 0,
					"max" : 0,
					"min" : 0
				},
				"second" : {
					"count" : 0,
					"sum" : 0,
					"avg" : 0,
					"max" : 0,
					"min" : 0
				},
				"error" : {
					"count" : 0,
					"sum" : 0,
					"avg" : 0,
					"max" : 0,
					"min" : 0
				},
				"from":"file",
				"path":_eventfolder,
				"eventId":eventId,
			};
		}else if (_isdebug){
			loadFile(_eventfolder + "/" + eventId + ".js");
			var event = eval("(" + jsId + ")");
			EfwServerEvent.prototype._events[eventId].event=event;
		}

		eventInfo = EfwServerEvent.prototype._events[eventId];
	}catch(e){
		eventInfo=null;
	} finally {
		Event_lock.unlock();
	}
	return eventInfo;
};
/**
 * The function to reload a event.
 * 
 * @param {String}
 *            eventId: required<br>
 */
EfwServerEvent.prototype._reload = function(eventId) {
	var eventinfo=EfwServerEvent.prototype._events[eventId];
	if (eventinfo!=null){
		if(eventinfo.from=="file"){
			delete EfwServerEvent.prototype._events[eventId];
			EfwServerEvent.prototype._loadFromFile(eventId);
		}else{//resource
			var path=eventinfo.path;
			delete EfwServerEvent.prototype._events[eventId];
			EfwServerEvent.prototype._loadFromResource(path,eventId);
		}
	}else{
		EfwServerEvent.prototype._loadFromFile(eventId);
	}
};
/**
 * The function to enable a event.
 * 
 * @param {String}
 *            eventId: required<br>
 */
EfwServerEvent.prototype._start = function(eventId) {
	EfwServerEvent.prototype._events[eventId].enable = true;
};
/**
 * The function to disable a event.
 * 
 * @param {String}
 *            eventId: required<br>
 */
EfwServerEvent.prototype._stop = function(eventId) {
	EfwServerEvent.prototype._events[eventId].enable = false;
};
/**
 * The function to update access statistics information.
 * 
 * @param {String}
 *            eventId: required<br>
 * @param {Boolean}
 *            flag: required<br>
 * @param {Date}
 *            beginTime: required<br>
 * @param {Date}
 *            endTime: required<br>
 */
EfwServerEvent.prototype._updateStatistics = function(eventId, flag, beginTime,endTime) {
	Event_lock.lock();
	try {
		var eventInfo = EfwServerEvent.prototype._events[eventId];
		var statistics = null;
		if (flag == "first") {
			statistics = eventInfo["first"];
		} else if (flag == "second") {
			statistics = eventInfo["second"];
		} else if (flag == "error") {
			statistics = eventInfo["error"];
		}
		var tm = endTime - beginTime;
		statistics["count"] = statistics["count"] + 1;
		statistics["sum"] = statistics["sum"] + tm;
		statistics["avg"] = statistics["sum"] / statistics["count"];
		if (tm > statistics["max"] || statistics["max"] == 0)
			statistics["max"] = tm;
		if (tm < statistics["min"] || statistics["min"] == 0)
			statistics["min"] = tm;
	} finally {
		Event_lock.unlock();
	}
};
/**
 * The function to get access statistics information.
 * 
 * @returns {Array}
 */
EfwServerEvent.prototype._getStatistics = function() {
	Event_lock.lock();
	var ret = [];
	try {
		for ( var key in EfwServerEvent.prototype._events) {
			if (key=="debug") continue;// debug function is skipped
			var eventInfo = EfwServerEvent.prototype._events[key];
			var statistics = {
				"eventId" : key,
				"enable" : eventInfo.enable,
				"eventName" : eventInfo.event.name,
				"errorCount" : eventInfo["error"].count,
				"errorSum" : eventInfo["error"].sum,
				"errorAvg" : eventInfo["error"].avg,
				"errorMax" : eventInfo["error"].max,
				"errorMin" : eventInfo["error"].min,
				"firstCount" : eventInfo["first"].count,
				"firstSum" : eventInfo["first"].sum,
				"firstAvg" : eventInfo["first"].avg,
				"firstMax" : eventInfo["first"].max,
				"firstMin" : eventInfo["first"].min,
				"secondCount" : eventInfo["second"].count,
				"secondSum" : eventInfo["second"].sum,
				"secondAvg" : eventInfo["second"].avg,
				"secondMax" : eventInfo["second"].max,
				"secondMin" : eventInfo["second"].min,
			};
			ret.push(statistics);
		}
	} finally {
		Event_lock.unlock();
	}
	return ret;
};
