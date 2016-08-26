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
	this._object = {};
	this._array = [];
	this.eventId=eventId;
	this.params=params;
	var beginTime = new Date();
	var fireFlag = "error";
	try {
		this.concat(EfwServerEvent.prototype.load(eventId).event.fire(params));
		fireFlag = "second";
	} finally {
		var endTime = new Date();
		EfwServerEvent.prototype.updateStatistics(eventId, fireFlag, beginTime,
				endTime);
	}
};
/**
 * The array to keep action values.
 */
Result.prototype._object = null;
/**
 * The array to keep return values.
 */
Event.prototype._array = null;
/**
 * The function to add one return value in array.<br>
 * And create runat attribute to it.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Event}
 */
Event.prototype.runat = function(selector) {
	return this;
};
/**
 * The function to create remove attribute to last return value.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Event}
 */
Event.prototype.remove = function(selector) {
	return this;
};
/**
 * The function to create append attribute to last return value.
 * 
 * @param {String}
 *            mask: required<br>
 * @returns {Event}
 */
Event.prototype.append = function(mask) {
	return this;
};
/**
 * The function to create widthdata attribute to last return value.
 * 
 * @param {Array |
 *            Object} data: required<br>
 * @returns {Event}
 */
Event.prototype.withdata = function(data) {
	return this;
};
/**
 * The function to concatenate to another result.
 * 
 * @param {Result}
 *            result: required<br>
 * @returns {Event}
 */
Event.prototype.concat = function(result) {
	return this;
};
/**
 * The function to show elements in client.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Event}
 */
Event.prototype.show = function(selector) {
	return this;
};
/**
 * The function to hide elements in client.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Event}
 */
Event.prototype.hide = function(selector) {
	return this;
};
/**
 * The function to disable elements in client.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Event}
 */
Event.prototype.disable = function(selector) {
	return this;
};
/**
 * The function to enable elements in client.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Event}
 */
Event.prototype.enable = function(selector) {
	return this;
};
/**
 * The function to navigate to another page in client.
 * 
 * @param {String}
 *            url: required<br>
 * @param {Object}
 *            params: optional<br>
 * @returns {Event}
 */
Event.prototype.navigate = function(url,params) {
	return this;
};
/**
 * The function to set download file or folder path(s).
 * 
 * @param {String |
 *            Array} path: required<br>
 * @returns {Event}
 */
Event.prototype.attach = function(path) {
	return this;
};
/**
 * The function to set a flag to delete original files after download.
 * 
 * @returns {Event}
 */
Event.prototype.deleteAfterDownload = function() {
	return this;
};
/**
 * The function to show alert in client.
 * 
 * @param {String |
 *            Array} message: required<br>
 * @param {Object}
 *            params: optional<br>
 * @returns {Event}
 */
Event.prototype.alert = function(message, params) {
	return this;
};
/**
 * The function to highlight error elements.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Event}
 */
Event.prototype.highlight = function(selector) {
	return this;
};
/**
 * The function to set focus to an element.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Event}
 */
Event.prototype.focus = function(selector) {
	return this;
};
/**
 * The function to stop success callback.
 * 
 * @returns {Event}
 */
Event.prototype.fail = function() {
	return this;
};
/**
 * The function to error.
 * 
 * @param {String}
 *            clientMessageId: required<br>
 * @param {Object}
 *            params: optional<br>
 * @returns {Event}
 */
Event.prototype.error = function(clientMessageId,params) {
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