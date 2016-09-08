/**
 * The class to format Date or Number in server.
 * 
 * @author Chang Kejun<br>
 *         the value of rounder:
 * 
 */
var EfwServerFormat = function() {
};
/**
 * The function to format Number to String.
 * 
 * @param {Number}
 *            value: required<br>
 * @param {String}
 *            formatter: required<br>
 * @param {String}
 *            rounder : optional, the default is HALF_EVEN<br>
 *            {UP | DOWN | CEILING | FLOOR | HALF_UP | HALF_DOWN | HALF_EVEN}<br>
 * @returns {String}
 */
EfwServerFormat.prototype.formatNumber = function(value, formatter, rounder) {
	value = Number(value);
	if (isNaN(value))
		return "";// if it is not number return ""
	return ""
			+ Packages.efw.format.FormatManager.formatNumber(value, formatter,
					rounder);
};
/**
 * The function to parse String to Number.
 * 
 * @param {Number}
 *            value: required<br>
 * @param {String}
 *            formatter: required<br>
 * @returns {null | Number}
 */
EfwServerFormat.prototype.parseNumber = function(value, formatter) {
	value += ""; // change value to string if it is a number
	if (!value)
		return null; // if value is blank return null
	return 0 + new Number(Packages.efw.format.FormatManager.parseNumber(value,
			formatter));
};
/**
 * The function to format Date to String.
 * 
 * @param {Date}
 *            value: required<br>
 * @param {String}
 *            formatter: required<br>
 * @returns {String}
 */
EfwServerFormat.prototype.formatDate = function(value, formatter) {
	if (value == null)
		return "";// it value is not null, return ""
	if (!value.getTime)
		return "";// if value is not date, return ""
	return ""
			+ Packages.efw.format.FormatManager.formatDate(value.getTime(),
					formatter);
};
/**
 * The function to parse String to Date.
 * 
 * @param {Date}
 *            value: required<br>
 * @param {String}
 *            formatter: required<br>
 * @returns {null | Date}
 */
EfwServerFormat.prototype.parseDate = function(value, formatter) {
	value += ""; // change value to string if it is not string
	if (!value)
		return null; // if value is blank return null
	var dt = new Date();
	dt.setTime(Packages.efw.format.FormatManager.parseDate(value, formatter)
			.getTime());
	return dt;
};
///////////////////////////////////////////////////////////////////////////////
/**
 * The function to format the Number self to String. 
 * @param {String}
 *            formatter: required<br>
 * @returns {String}
 */
Number.prototype.format=function(formatter){
	return EfwServerFormat.prototype.formatNumber(this,formatter);
};
/**
 * The function to parse the value to Number.
 * @param {String} value: required<br>
 * @param {String} formatter: required<br>
 * @returns {Number}
 */
Number.parse=function(value,formatter){
	if(formatter==null){
		return new Number(value);
	}else{
		return EfwServerFormat.prototype.parseNumber(value, formatter); 
	}
};
/**
 * The function to format the Date self to String. 
 * @param {String}
 *            formatter: required<br>
 * @returns {String}
 */
Date.prototype.format=function(formatter){
	return EfwServerFormat.prototype.formatDate(this,formatter);
};
/**
 * The function to parse the value to Date.
 * @param {String} value: required<br>
 * @param {String} formatter: required<br>
 * @returns {Date}
 */
Date.parse=function(value,formatter){
	if(formatter==null){
		return (new Date(value)).getTime();
	}else{
		return EfwServerFormat.prototype.parseDate(value, formatter); 
	}
};

