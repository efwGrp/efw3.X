/**
 * The class to operate session.
 * 
 * @author Chang Kejun
 */
function EfwServerSession() {
};
/**
 * The function to get data from session.
 * 
 * @param {String}
 *            key: the session key.
 * @returns {Any}
 */
EfwServerSession.prototype.get = function(key) {
	return Packages.efw.efwServlet.getRequest().getSession().getAttribute(key);
};
/**
 * The function to set data in session.
 * 
 * @param {String}
 *            key: the session key.
 * @param {Any}
 *            value: the data you want to set in session.
 */
EfwServerSession.prototype.set = function(key, value) {
	Packages.efw.efwServlet.getRequest().getSession().setAttribute(key, value);
};