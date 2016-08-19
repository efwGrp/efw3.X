/**
 * The class to fire another event in an event firing.
 * 
 * @param {String}
 *            eventId: required<br>
 * @param {Object}
 *            params: required<br>
 *            {param1:value1,param2:value2,...}<br>
 * @author Chang Kejun
 */
function Event(eventId, params) {
	this.eventId=eventId;
	this.params=params;
	var beginTime = new Date();
	var fireFlag = "error";
	try {
		this._array = EfwServerEvent.prototype.load(eventId).fire(params)._array;
		fireFlag = "second";
	} finally {
		var endTime = new Date();
		EfwServerEvent.prototype.updateStatistics(eventId, fireFlag, beginTime,
				endTime);
	}
};
/**
 * The array to keep return values.
 */
Event.prototype._array = null;
/**
 * The function to add one return value in array.<br>
 * And create runat attribute to it.
 * 
 * @param {String}
 *            selector
 * @returns {Event}
 */
Event.prototype.runat = function(selector) {
	return this;
};
/**
 * The function to create remove attribute to last return value.
 * 
 * @param {String}
 *            selector
 * @returns {Event}
 */
Event.prototype.remove = function(selector) {
	return this;
};
/**
 * The function to create append attribute to last return value.
 * 
 * @param {String}
 *            mask
 * @returns {Event}
 */
Event.prototype.append = function(mask) {
	return this;
};
/**
 * The function to create widthdata attribute to last return value.
 * 
 * @param {Array |
 *            Object} data
 * @returns {Event}
 */
Event.prototype.withdata = function(data) {
	return this;
};
/**
 * The function to concatenate to another result.
 * 
 * @param {Result}
 *            result
 * @returns {Event}
 */
Event.prototype.concat = function(result) {
	return this;
};
/**
 * Event is extended from Result.
 */
Event.prototype = Result.prototype;
/**
 * eventId from constructor
 */
Event.prototype.eventId=null;
/**
 * params from constructor
 */
Event.prototype.params=null;