/**
 * The locker for master operating.
 */
var Master_lock = new java.util.concurrent.locks.ReentrantLock();
/**
 * The class to operate Master data in memory.
 * 
 * @param {String}
 *            masterId: required<br>
 * @param {Boolean}
 *            reload
 */
function Master(masterId, reload) {
	Master_lock.lock();
	this.masterId = masterId;
	try {
		if (reload == true) {
			Master.prototype._masters[masterId] = EfwServerDb.prototype
					.executeQuery({
						"sql" : "select * from " + masterId
					});
		} else if (Master.prototype._masters[masterId] == null) {
			Master.prototype._masters[masterId] = EfwServerDb.prototype
					.executeQuery({
						"sql" : "select * from " + masterId
					});
		}
		this._array = Master.prototype._masters[masterId];
	} finally {
		Master_lock.unlock();
	}
};
/**
 * The internal variable for keeping records.
 */
Master.prototype._array = null;
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
 * @returns {Master}
 */
Master.prototype.seek = function(field, action, value) {
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
 * @returns {Master}
 */
Master.prototype.sort = function(field, action) {
	return this;
};
/**
 * The function to change the record format.
 * 
 * @param mapping:
 *            required<br>
 *            {fieldnew1:fieldold1,fieldnew2:fieldold2,...}<br>
 * @returns {Master}
 */
Master.prototype.map = function(mapping) {
	return this;
};
/**
 * The function to get the first data item from records.
 * 
 * @returns {Object}
 */
Master.prototype.getSingle = function() {
	return null;
};
/**
 * The function to get the array data from records.
 * 
 * @returns {Array}
 */
Master.prototype.getArray = function() {
	return null;
};
/**
 * The function to get a field value from the first data of records.
 * 
 * @param {String}
 *            field: required<br>
 * @returns {String | Number | Date | Boolean}
 */
Master.prototype.getValue = function(field) {
	return null;
};
/**
 * Master is extended from Record.
 */
Master.prototype = Record.prototype;
/**
 * Add _masters to Master prototype.
 */
Master.prototype._masters = {};
/**
 * masterId from constructor
 */
Master.prototype.masterId = null;

