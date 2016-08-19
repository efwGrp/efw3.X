/**
 * The class to execute insert update delete sql in database.
 * <br>
 * new Change(groupId,sqlId,params)<br>
 * new Change(groupId,sqlId,params,jdbcResourceName)<br>
 * new Change(sql)<br>
 * new Change(sql,jdbcResourceName)<br>
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
function Change(groupId, sqlId, params, jdbcResourceName) {
	//if new Select(sql)
	if (params==undefined){
		this.sql=groupId;//first param
		this.jdbcResourceName=sqlId;//second param
		this.count = EfwServerDb.prototype.executeUpdate({
			"jdbcResourceName" : this.jdbcResourceName,
			"sql" : this.sql
		});
	}else{
		this.groupId=groupId;
		this.sqlId=sqlId;
		this.params=params;
		this.jdbcResourceName=jdbcResourceName;
		this.count = EfwServerDb.prototype.executeUpdate({
			"jdbcResourceName" : jdbcResourceName,
			"groupId" : groupId,
			"sqlId" : sqlId,
			"params" : params
		});
	}
};
/**
 * groupId from constructor
 */
Change.prototype.groupId = null;
/**
 * sqlId from constructor
 */
Change.prototype.sqlId = null;
/**
 * params from constructor
 */
Change.prototype.params = null;
/**
 * jdbcResourceName from constructor
 */
Change.prototype.jdbcResourceName = null;
/**
 * sql from constructor
 */
Change.prototype.sql = null;
/**
 * The count of records changed by sql.
 */
Change.prototype.count = null;
