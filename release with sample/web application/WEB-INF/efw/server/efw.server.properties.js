/**
 * The class to operate efw.properties file.
 * 
 * @author Chang Kejun
 */
var EfwServerProperties = function() {
};
/**
 * The function to get String value from efw.properties file.
 * 
 * @param {String}
 *            key
 * @param {String}
 *            defaultValue
 * @returns {String}
 */
EfwServerProperties.prototype.get = function(key, defaultValue) {
	var dv;
	if (defaultValue == undefined) {
		dv = null;
	} else {
		dv = defaultValue + "";
	}
	return "" + Packages.efw.properties.PropertiesManager.getProperty(key, dv);
};
/**
 * The function to get Boolean value from efw.properties file.
 * 
 * @param {String}
 *            key
 * @param {Boolean}
 *            defaultValue
 * @returns {Boolean}
 */
EfwServerProperties.prototype.getBoolean = function(key, defaultValue) {
	var dv;
	if (defaultValue == undefined) {
		dv = false;
	} else {
		dv = defaultValue && true;
	}
	return true && Packages.efw.properties.PropertiesManager
			.getBooleanProperty(key, dv);
};
/**
 * The function to get Number value from efw.properties file.
 * 
 * @param {String}
 *            key
 * @param {Number}
 *            defaultValue
 * @returns {Number}
 */
EfwServerProperties.prototype.getInt = function(key, defaultValue) {
	var dv;
	if (defaultValue == undefined) {
		dv = 0;
	} else {
		dv = defaultValue + 0;
	}
	return 0 + Packages.efw.properties.PropertiesManager
			.getIntProperty(key, dv);
};
