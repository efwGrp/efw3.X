/**
 * The class to operate Database.
 * 
 * @author Chang Kejun
 */
function EfwServerDb() {
};
/**
 * The function to execute select sql.
 * 
 * @param executionParams
 *            <br>{ <br>
 *            groupId:String,//required<br>
 *            sqlId:String,//optional<br>
 *            sql:String,//optional<br>
 *            params:{param1:value1,param2:value2,...}//required<br>
 *            jdbcResourceName:String,//optional<br> }<br>
 * @returns {null | Array}
 */
EfwServerDb.prototype.executeQuery = function(executionParams) {
	var jdbcResourceName = executionParams.jdbcResourceName;
	if (jdbcResourceName == undefined || jdbcResourceName == null)
		jdbcResourceName = "";
	var groupId = executionParams.groupId;
	var sqlId = executionParams.sqlId;
	var sql = executionParams.sql;
	var aryParam = executionParams.params;
	var params = new java.util.HashMap();
	for ( var key in aryParam) {
		if (key=="debug") continue;// debug function is skipped
		var vl = aryParam[key];
		if (vl == null || vl == "")
			vl = null;
		else if (vl.getTime)
			vl = new java.sql.Date(vl.getTime());
		params.put(key, vl);
	}
	var rs;
	if (sqlId != null) {
		rs = Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName)
				.executeQuery(groupId, sqlId, params);
	} else if (sql != null) {
		rs = Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName)
				.executeQuerySql(sql);
	} else {
		return null;
	}
	var ret = [];
	var meta = rs.getMetaData();
	var parseValue = function(vl) {
		var value = vl;
		if (typeof value == "object") {
			if (value == null) {
				value = null;
			} else if (value.getClass().getName() == "java.lang.String") {
				value = "" + value;
			} else if (value.getClass().getName() == "java.lang.Boolean") {
				value = true && value;
			} else if (value.getClass().getName() == "java.lang.Byte"
					|| value.getClass().getName() == "java.lang.Short"
					|| value.getClass().getName() == "java.lang.Integer"
					|| value.getClass().getName() == "java.lang.Long"
					|| value.getClass().getName() == "java.lang.Float"
					|| value.getClass().getName() == "java.lang.Double"
					|| value.getClass().getName() == "java.math.BigDecimal") {
				value = 0 + new Number(value);
			} else if (value.getClass().getName() == "java.sql.Date"
					|| value.getClass().getName() == "java.sql.Time"
					|| value.getClass().getName() == "java.sql.Timestamp") {
				var dt = new Date();
				dt.setTime(value.getTime());
				value = dt;
			} else {
				// you should do something if the comment is printed out.
				Packages.efw.log.LogManager.ErrorDebug("[" + value
						+ "] is an instance of " + value.getClass().getName()
						+ " which has not been supported by efw.", "");
			}
		}
		return value;
	};

	while (rs.next()) {// change recordset to javascript array
		var rsdata = {};
		var maxColumnCount = meta.getColumnCount();
		for (var j = 1; j <= maxColumnCount; j++) {
			var key = meta.getColumnName(j);
			rsdata[key] = parseValue(rs.getObject(key));
		}
		ret.push(rsdata);
	}
	rs.close();
	// close query to free handle
	Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName).closeQuery();
	return ret;
};
/**
 * The function to execute insert update delete sql.
 * @param executionParams
 *            <br>{ <br>
 *            groupId:String,//required<br>
 *            sqlId:String,//optional<br>
 *            sql:String,//optional<br>
 *            params:{param1:value1,param2:value2,...}//required<br>
 *            jdbcResourceName:String,//optional<br> }<br>
 * @returns {Number}
 */
EfwServerDb.prototype.executeUpdate = function(executionParams) {
	var jdbcResourceName = executionParams.jdbcResourceName;
	if (jdbcResourceName == undefined || jdbcResourceName == null)
		jdbcResourceName = "";
	var groupId = executionParams.groupId;
	var sqlId = executionParams.sqlId;
	var sql = executionParams.sql;
	var aryParam = executionParams.params;
	var params = new java.util.HashMap();
	for ( var key in aryParam) {
		if (key=="debug") continue;// debug function is skipped
		var vl = aryParam[key];
		if (vl == null || vl == "")
			vl = null;
		else if (vl.getTime)
			vl = new java.sql.Date(vl.getTime());
		params.put(key, vl);
	}
	if (sqlId != null)
		return Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName)
				.executeUpdate(groupId, sqlId, params);
	if (sql != null)
		return Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName)
				.executeUpdateSql(sql);
	return 0;
};
/**
 * The function to commit.
 * @param {String} jdbcResourceName
 */
EfwServerDb.prototype.commit = function(jdbcResourceName) {
	if (jdbcResourceName == undefined || jdbcResourceName == null)
		jdbcResourceName = "";
	Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName).commit();
};
/**
 * The function to rollback.
 * @param {String} jdbcResourceName
 */
EfwServerDb.prototype.rollback = function(jdbcResourceName) {
	if (jdbcResourceName == undefined || jdbcResourceName == null)
		jdbcResourceName = "";
	Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName).rollback();
};
/**
 * The function to open database.
 * @param {String} jdbcResourceName
 */
EfwServerDb.prototype.open = function(jdbcResourceName) {
	if (jdbcResourceName == undefined || jdbcResourceName == null)
		jdbcResourceName = "";
	Packages.efw.db.DatabaseManager.open(jdbcResourceName);
};

/**
 * The function to close all database.
 */
EfwServerDb.prototype.closeAll = function() {
	Packages.efw.db.DatabaseManager.closeAll();
};
