/**
 * The class to execute select sql in database.<br>
 * <br>
 * new Select(groupId,sqlId,params)<br>
 * new Select(groupId,sqlId,params,jdbcResourceName)<br>
 * new Select(sql)<br>
 * new Select(sql,jdbcResourceName)<br>
 * <br>
 * @param {String}
 *            groupId<br>
 * @param {String}
 *            sqlId<br>
 * @param {Object}
 *            params<br>
 *            {param1:value1,param2:value2,...}<br>
 * @param {String}
 *            jdbcResourceName<br>
 * @param {String}
 *            sql<br>
 * @author Chang Kejun
 */
function Select(groupId, sqlId, params, jdbcResourceName) {
	//if new Select(sql)
	if (params==undefined){
		this.sql=groupId;//first param
		this.jdbcResourceName=sqlId;//second param
		this._array = EfwServerDb.prototype.executeQuery({
			"jdbcResourceName" : this.jdbcResourceName,
			"sql" : this.sql
		});
	}else{
		this.groupId=groupId;
		this.sqlId=sqlId;
		this.params=params;
		this.jdbcResourceName=jdbcResourceName;
		this._array = EfwServerDb.prototype.executeQuery({
			"jdbcResourceName" : jdbcResourceName,
			"groupId" : groupId,
			"sqlId" : sqlId,
			"params" : params
		});
	}
};
/**
 * The internal variable for keeping records.
 */
Select.prototype._array = null;
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
 * @returns {Select}
 */
Select.prototype.seek = function(field, action, value) {
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
 * @returns {Select}
 */
Select.prototype.sort = function(field, action) {
	return this;
};
/**
 * The function to change the record format.
 * 
 * @param mapping:
 *            required<br>
 *            {fieldnew1:fieldold1,fieldnew2:fieldold2,...}<br>
 * @returns {Select}
 */
Select.prototype.map = function(mapping) {
	return this;
};
/**
 * The function to get the first data item from records.
 * 
 * @returns {Object}
 */
Select.prototype.getSingle = function() {
	return null;
};
/**
 * The function to get the array data from records.
 * 
 * @returns {Array}
 */
Select.prototype.getArray = function() {
	return null;
};
/**
 * The function to get a field value from the first data of records.
 * 
 * @param {String}
 *            field: required<br>
 * @returns {String | Number | Date | Boolean}
 */
Select.prototype.getValue = function(field) {
	return null;
};
/**
 * Select is extended from Record.
 */
Select.prototype = Record.prototype;
/**
 * groupId from constructor
 */
Select.prototype.groupId = null;
/**
 * sqlId from constructor
 */
Select.prototype.sqlId = null;
/**
 * params from constructor
 */
Select.prototype.params = null;
/**
 * jdbcResourceName from constructor
 */
Select.prototype.jdbcResourceName = null;
/**
 * sql from constructor
 */
Select.prototype.sql = null;
