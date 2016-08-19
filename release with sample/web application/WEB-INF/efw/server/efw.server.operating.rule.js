/**
 * The class to execute rule.
 * 
 * @param {String}
 *            ruleCode: required<br>
 * @param {Object}
 *            params: required<br>
 *            {param1:value1,param2:value2,...}<br>
 * @param {Date}
 *            ruleDate: optional<br>
 * @author Chang Kejun
 */
function Rule(ruleCode, params, ruleDate) {
	this.ruleCode=ruleCode;
	this.params=params;
	this.ruleDate=ruleDate;
	this._array = [];
	this._array = EfwServerBRMS.prototype.executeQuery({
		"ruleCode" : ruleCode,
		"params" : params,
		"ruleDate" : ruleDate,
	});
};
/**
 * The internal variable for keeping records.
 */
Rule.prototype._array = null;
/**
 * Seek in records.<br>
 * The action is one of the options: [ eq | gt | lt | like | !eq | !gt | !lt |
 * !like ]
 * 
 * @param {String}
 *            field: required<br>
 * @param {String}
 *            action: required<br>
 * @param {String |
 *            Number | Date | Boolean} value: required<br>
 * @returns {Rule}
 */
Rule.prototype.seek = function(field, action, value) {
	return this;
};
/**
 * Sort records.<br>
 * The action is one of the options: [ asc | desc ]
 * 
 * @param {String}
 *            field: required<br>
 * @param {String}
 *            action: required<br>
 * @returns {Rule}
 */
Rule.prototype.sort = function(field, action) {
	return this;
};
/**
 * The function to change the record format.
 * 
 * @param mapping:
 *            required<br>
 *            {fieldnew1:fieldold1,fieldnew2:fieldold2,...}<br>
 * @returns {Rule}
 */
Rule.prototype.map = function(mapping) {
	return this;
};
/**
 * The function to get the first data item from records.
 * 
 * @returns {Object}
 */
Rule.prototype.getSingle = function() {
	return null;
};
/**
 * The function to get the array data from records.
 * 
 * @returns {Array}
 */
Rule.prototype.getArray = function() {
	return null;
};
/**
 * The function to get a field value from the first data of records.
 * 
 * @param {String}
 *            field: required<br>
 * @returns {String | Number | Date | Boolean}
 */
Rule.prototype.getValue = function(field) {
	return null;
};
/**
 * Rule is extended from Record.
 */
Rule.prototype = Record.prototype;
/**
 * ruleCode from constructor
 */
Rule.prototype.ruleCode=null;
/**
 * params from constructor
 */
Rule.prototype.params=null;
/**
 * ruleDate from constructor
 */
Rule.prototype.ruleDate=null;
