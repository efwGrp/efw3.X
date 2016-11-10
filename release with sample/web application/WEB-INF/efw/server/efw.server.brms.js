/**
 * The class for rule engine calling
 * 
 * @author Chang kejun
 */
function EfwServerBRMS() {
};
/**
 * The function to execute rule.
 * 
 * @param {String}
 *            ruleCode: required<br>
 * @param {Object}
 *            params: required<br>
 *            {param1:value1,param2:value2,...}<br>
 * @param {Date}
 *            ruleDate: optional<br>
 * @returns {Record}
 */
EfwServerBRMS.prototype.rule = function(ruleCode, params, ruleDate) {
	var values = EfwServerBRMS.prototype._executeQuery({
		"ruleCode" : ruleCode,
		"params" : params,
		"ruleDate" : ruleDate,
	});
	return new Record(values);
};
///////////////////////////////////////////////////////////////////////////////
/**
 * The function to execute rule.
 * 
 * @param executionParams
 *            <br> {<br>
 *            ruleCode:String, //required<br>
 *            params:{param1:value1,param2:value2...}, //required<br>
 *            ruleDate:Date //optional<br> }<br>
 * @returns {Array}
 */
EfwServerBRMS.prototype._executeQuery = function(executionParams) {
	var ruleCode = executionParams.ruleCode;
	var ruleDate;
	var aryParam = executionParams.params;
	var params = new java.util.HashMap();
	if (executionParams.ruleDate != null && executionParams.ruleDate != "") {
		ruleDate = executionParams.ruleDate;
	} else {
		ruleDate = EfwServerFormat.prototype.formatDate(new Date(),
				"yyyy-MM-dd");
	}
	for ( var key in aryParam) {
		if (key=="debug") continue;// debug function is skipped
		var vl = aryParam[key];

		if (null == vl ||(typeof(vl) == "string" && vl == "")){
			vl = null;
		}
		params.put(key, vl);
	}

	var rs = Packages.efw.brms.BrmsManager.execute(ruleCode, ruleDate, params);
	var ret = [];
	var meta = rs.getMetaData();
	var parseValue = function(rs, idx) {
		var value = null;
		if (meta.getColumnType(idx) == com.innoexpert.rulesclient.Constants.TYPE_NUMBER) {
			value = 0 + new Number(rs.getDouble(idx));
		} else if (meta.getColumnType(idx) == com.innoexpert.rulesclient.Constants.TYPE_STRING) {
			value = "" + rs.getString(idx);
		} else if (meta.getColumnType(idx) == com.innoexpert.rulesclient.Constants.TYPE_BOOLEAN) {
			value = true && rs.getBoolean(idx);
		}
		return value;
	};
	// change recordset to java array
	while (rs.next()) {
		var rsdata = {};
		var maxColumnCount = meta.getColumnCount();
		for (var j = 1; j <= maxColumnCount; j++) {
			var key = meta.getColumnName(j);
			rsdata[key] = parseValue(rs, j);
		}
		ret.push(rsdata);
	}
	return ret;
};
