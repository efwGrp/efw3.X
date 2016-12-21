/**** efw3.X Copyright 2016 efwGrp ****/
/**
 * The class to operate cookie.
 * 
 * @author Chang Kejun
 */
function EfwServerCookie() {
};
/**
 * The function to get data from cookie.
 * 
 * @param {String}
 *            key: the cookie key.
 * @returns {String}
 */
EfwServerCookie.prototype.get = function(key) {
	var value=Packages.efw.cookie.CookieManager.get(key);
	if (value==null) value="";
	return value;
};
/**
 * The function to set data in cookie.
 * 
 * @param {String}
 *            key: the cookie key.
 * @param {String}
 *            value: the data you want to set in cookie.
 */
EfwServerCookie.prototype.set = function(key, value) {
	Packages.efw.cookie.CookieManager.set(key, ""+value);
};
