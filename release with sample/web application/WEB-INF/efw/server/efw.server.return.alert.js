/**
 * The class to show alert at client from server side.
 * @param {String} message: required<br>
 * @author Chang Kejun
 */
function Alert(message) {
	this._object = {
		"alert" : {
			"message" : message
		}
	};
};
/**
 * The object to keep alert information.
 */
Alert.prototype._object = null;
/**
 * The function to set focus to an element.
 * @param {String} selector: required<br>
 * @returns {Alert}
 */
Alert.prototype.focusTo = function(selector) {
	this._object.alert.focusTo = selector;
	return this;
};
/**
 * The function to highlight error elements.
 * @param {String} selector: required<br>
 * @returns {Alert}
 */
Alert.prototype.highlight = function(selector) {
	if (this._object.alert.elements == null)
		this._object.alert.elements = [];
	if (selector instanceof Array) {
		this._object.alert.elements = this._object.alert.elements
				.concat(selector);
	} else {
		this._object.alert.elements.push(selector);
	}
	return this;
};
/**
 * The function to set next page after alert.
 * @param {String} nextUrl: required<br>
 */
Alert.prototype.nevigateTo=function(nextUrl){
	this._object.alert.nextUrl = nextUrl;
	return this;
};
