/**
 * The class as event result.
 * 
 * @author Chang Kejun
 */
function Result() {
	this._array = [];
};
/**
 * The array to keep return values.
 */
Result.prototype._array = null;
/**
 * The function to add one return value in array.<br>
 * And create runat attribute to it.
 * 
 * @param {String}
 *            selector
 * @returns {Result}
 */
Result.prototype.runat = function(selector) {
	var ret = {};
	ret.runat = selector;
	this._array.push(ret);
	return this;
};
/**
 * The function to create remove attribute to last return value.
 * 
 * @param {String}
 *            selector
 * @returns {Result}
 */
Result.prototype.remove = function(selector) {
	if (this._array.length > 0) {
		var ret = this._array[this._array.length - 1];
		ret.remove = selector;
	}
	return this;
};
/**
 * The function to create append attribute to last return value.
 * 
 * @param {String}
 *            mask
 * @returns {Result}
 */
Result.prototype.append = function(mask) {
	if (this._array.length > 0) {
		var ret = this._array[this._array.length - 1];
		ret.append = mask;
	}
	return this;
};
/**
 * The function to create widthdata attribute to last return value.
 * 
 * @param {Array |
 *            Object} data
 * @returns {Result}
 */
Result.prototype.withdata = function(data) {
	if (this._array.length > 0) {
		var ret = this._array[this._array.length - 1];
		ret.withdata = data;
	}
	return this;
};
/**
 * The function to concatenate to another result.
 * 
 * @param {Result} result
 * @returns {Result}
 */
Result.prototype.concat = function(result) {
	if (result["_array"] != null) {
		this._array = this._array.concat(result._array);
	} else {
		this._array = this._array.concat(result);
	}
	return this;
};
