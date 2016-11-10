/**
 * The class to operate Database.
 * 
 * @author Chang Kejun
 */
function EfwServerDb() {};
/**
 * The class to execute insert update delete sql in database.
 * <br>
 * db.change(groupId,sqlId,params)<br>
 * db.change(groupId,sqlId,params,jdbcResourceName)<br>
 * db.change(sql)<br>
 * db.change(sql,jdbcResourceName)<br>
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
 * @returns {Number}
 */
EfwServerDb.prototype.change = function(groupId, sqlId, params, jdbcResourceName) {
	var count=0;
	if (params==undefined){
		var innerSql=groupId;//first param
		var innerJdbcResourceName=sqlId;//second param
		count = EfwServerDb.prototype._executeUpdate({
			"jdbcResourceName" : innerJdbcResourceName,
			"sql" : innerSql
		});
	}else{
		count = EfwServerDb.prototype._executeUpdate({
			"jdbcResourceName" : jdbcResourceName,
			"groupId" : groupId,
			"sqlId" : sqlId,
			"params" : params
		});
	}
	return count;
};
/**
 * The locker for master operating.
 */
var Master_lock = new java.util.concurrent.locks.ReentrantLock();
EfwServerDb.prototype._masters={};
/**
 * The function to operate master data in memory.
 * 
 * @param {String}
 *            masterId: required<br>
 * @param {Boolean}
 *            reload
 * @returns {Record}
 */
EfwServerDb.prototype.master=function(masterId, reload) {
	Master_lock.lock();
	var values;
	try {
		if (reload == true) {
			EfwServerDb.prototype._masters[masterId] = EfwServerDb.prototype._executeQuery({
						"sql" : "select * from " + masterId
					});
		} else if (EfwServerDb.prototype._masters[masterId] == null) {
			EfwServerDb.prototype._masters[masterId] = EfwServerDb.prototype._executeQuery({
						"sql" : "select * from " + masterId
					});
		}
		values = EfwServerDb.prototype._masters[masterId];
	} finally {
		Master_lock.unlock();
	}
	return new Record(values);
};

/**
 * The function to execute select sql in database.<br>
 * <br>
 * select(groupId,sqlId,params)<br>
 * select(groupId,sqlId,params,jdbcResourceName)<br>
 * select(sql)<br>
 * select(sql,jdbcResourceName)<br>
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
 * @returns {Record}
 */
EfwServerDb.prototype.select =function(groupId, sqlId, params, jdbcResourceName) {
	var values;
	if (params==undefined){
		var innerSql=groupId;//first param
		var innerJdbcResourceName=sqlId;//second param
		values = EfwServerDb.prototype._executeQuery({
			"jdbcResourceName" : innerJdbcResourceName,
			"sql" : innerSql
		});
	}else{
		values = EfwServerDb.prototype._executeQuery({
			"jdbcResourceName" : jdbcResourceName,
			"groupId" : groupId,
			"sqlId" : sqlId,
			"params" : params
		});
	}
	return new Record(values);
};
///////////////////////////////////////////////////////////////////////////////
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
EfwServerDb.prototype._executeQuery = function(executionParams) {
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
		if (null == vl ||(typeof(vl) == "string" && vl == "")){
			vl = null;
		}else if (vl.getTime){
			vl = new java.sql.Date(vl.getTime());
		}
		params.put(key, vl);
	}
	var db=Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName);
	if (db==null){
		EfwServerDb.prototype._open(jdbcResourceName);
		db=Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName);
	}
	var rs;
	if (sqlId != null) {
		rs = db.executeQuery(groupId, sqlId, params);
	} else if (sql != null) {
		rs = db.executeQuerySql(sql);
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
EfwServerDb.prototype._executeUpdate = function(executionParams) {
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
		if (null == vl ||(typeof(vl) == "string" && vl == "")){
			vl = null;
		}else if (vl.getTime){
			vl = new java.sql.Date(vl.getTime());
		}
		params.put(key, vl);
	}
	var db=Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName);
	if (db==null){
		EfwServerDb.prototype._open(jdbcResourceName);
		db=Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName);
	}
	if (sqlId != null)
		return db.executeUpdate(groupId, sqlId, params);
	if (sql != null)
		return db.executeUpdateSql(sql);
	return 0;
};
/**
 * The function to commit.
 * @param {String} jdbcResourceName
 */
EfwServerDb.prototype._commit = function(jdbcResourceName) {
	if (jdbcResourceName == undefined || jdbcResourceName == null)
		jdbcResourceName = "";
	Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName).commit();
};
/**
 * The function to rollback.
 * @param {String} jdbcResourceName
 */
EfwServerDb.prototype._rollback = function(jdbcResourceName) {
	if (jdbcResourceName == undefined || jdbcResourceName == null)
		jdbcResourceName = "";
	Packages.efw.db.DatabaseManager.getDatabase(jdbcResourceName).rollback();
};
/**
 * The function to open database.
 * @param {String} jdbcResourceName
 */
EfwServerDb.prototype._open = function(jdbcResourceName) {
	if (jdbcResourceName == undefined || jdbcResourceName == null)
		jdbcResourceName = "";
	Packages.efw.db.DatabaseManager.open(jdbcResourceName);
};

/**
 * The function to close all database.
 */
EfwServerDb.prototype._closeAll = function() {
	Packages.efw.db.DatabaseManager.closeAll();
};

/**
 * The function to commit all database.
 */
EfwServerDb.prototype._commitAll = function() {
	Packages.efw.db.DatabaseManager.commitAll();
};

/**
 * The function to rollback all database.
 */
EfwServerDb.prototype._rollbackAll = function() {
	Packages.efw.db.DatabaseManager.rollbackAll();
};
