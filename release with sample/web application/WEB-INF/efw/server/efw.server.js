/**
 * The class to check or fire event.
 * 
 * @author Chang Kejun
 */
function EfwServer() {
};
/**
 * The function to check request params by params format
 * 
 * @param event:
 *            event object defined in your program.
 * @param requestParams:
 *            params from client.
 * @returns {null | Result}<br>
 */
EfwServer.prototype.check = function(event, requestParams) {
	function _check(pms, fts, parentkey) { // required,format,display-name,max-length,min,max,
		var result = new Result();
		if (parentkey != null && parentkey != "")
			parentkey += " ";// in order for the space, parentkey+" "+sonkey"
		for ( var key in fts) { // check requestParams by every format define
			if (key=="debug") continue;// debug function is skipped
			var paramdef = fts[key];
			var param = pms[key];

			if (paramdef == null) { // if format define is null do nothing
			} else if (paramdef instanceof Array) { // if format define is array
				if (param != null) {
					// loop it to validate items in the array
					for (var i = 0; i < paramdef.length; i++) {
						result = result.concat(_check(param[i], paramdef[0],
								parentkey + key + ":eq(" + i + ")"));
					}
				}
			} else if (typeof paramdef === "object") {
				// if format define is object check it
				if (param != null) { // validate attributes in the object
					result = result.concat(_check(param, paramdef, parentkey + key));
				}
			} else if (typeof paramdef == "string") {
				// if paramdef is string ,it means validators
				var validators = {};
				// split with [;] then split with fist [:] to get
				var tempAry = paramdef.split(";");
				for (var i = 0; i < tempAry.length; i++) {
					var vdtr = tempAry[i];
					var point = vdtr.indexOf(":");
					if (point > 0)
						validators[vdtr.substring(0, point)] = vdtr
								.substring(point + 1);
				}
				// must be inputed
				var required = validators["required"];
				// input format for date or number
				var format = validators["format"];
				// display name in error message
				var displayName = validators["display-name"];
				// input length for string
				var maxLength = validators["max-length"];
				var min = validators["min"]; // min value in format define
				var max = validators["max"]; // max value in format define
				var accept = validators["accept"]; // file ext name
				var minv = null; // min value
				var maxv = null; // max value
				var value = null; // the value of param
				// pay attention to the space, parentkey+" "+sonkey"
				var errorElementKey = parentkey + key;
				if ((param == null || param == "") && required == "true") {
					// if data is not inputed check required
					var message = EfwServerMessages.prototype.IsRequiredMessage;
					result.alert(message,{"display-name":displayName})
					.highlight(errorElementKey)
					.focus(errorElementKey)
					.fail();
					continue;
				} else if (param != null && param != "" && format != null
						&& format != "") {
					// check format and convert data type
					var parser = null;
					var requriedMessage = null;
					// number #,##0.0
					if (format.indexOf("#") > -1 || format.indexOf("0") > -1) {
						parser = EfwServerFormat.prototype.parseNumber;
						requriedMessage = EfwServerMessages.prototype.NumberIsReuqiredMessage;
					} else { // date yyyy/MM/dd
						parser = EfwServerFormat.prototype.parseDate;
						requriedMessage = EfwServerMessages.prototype.DateIsReuqiredMessage;
					}
					try { // check it is number or not
						value = parser(param, format);
						pms[key] = value;
						try {
							minv = parser(min, format);
						} catch (e) {
						}
						try {
							maxv = parser(max, format);
						} catch (e) {
						}
					} catch (e) {
						var message = requriedMessage;
						result.alert(message,{"display-name":displayName})
						.highlight(errorElementKey)
						.focus(errorElementKey)
						.fail();
						continue;
					}
				} else if (param != null && param != "") {
					// if no format, the data is regraded as string,check maxlength
					var maxLengthv = new Number(maxLength);
					if (isNaN(maxLengthv))
						maxLengthv = null;
					// check max length
					if (maxLengthv != null && param.length > maxLengthv) {
						var message = EfwServerMessages.prototype.MaxLengthOverMessage;
						result.alert(message,{"display-name":displayName,"max-length":maxLength})
						.highlight(errorElementKey)
						.focus(errorElementKey)
						.fail();
						continue;
					}
					if (accept != null) { // check file ext
						var exts = accept.split(",");
						var isAccepted = false;
						for (var i = 0; i < exts.length; i++) {
							if (param.substr(param.length - exts[i].length)
									.toLowerCase() == exts[i].toLowerCase()) {
								isAccepted = true;
								break;
							}
						}
						if (!isAccepted) {
							var message = EfwServerMessages.prototype.NotAcceptMessage;
							result.alert(message,{"display-name":displayName})
							.highlight(errorElementKey)
							.focus(errorElementKey)
							.fail();
							continue;
						}
					}
					if (min == null || min == undefined)
						minv = null;
					else
						minv = min;
					if (max == null || max == undefined)
						maxv = null;
					else
						maxv = max;
					value = param;
				}

				if (value != null && value != "") {// check min max
					var message = null;
					if (minv != null && maxv != null) {
						if (value < minv || value > maxv)
							message = EfwServerMessages.prototype.MinOrMaxOverMessage;
					} else if (minv != null) {
						if (value < minv)
							message = EfwServerMessages.prototype.MinOverMessage;
					} else if (maxv != null) {
						if (value < maxv)
							message = EfwServerMessages.prototype.MaxOverMessage;
					}
					if (message != null) {
						var dataType="";
						if (value.toFixed){
							dataType=EfwServerMessages.prototype.NumberType;
						}else if (value.getTime){
							dataType=EfwServerMessages.prototype.DateType;
						}else{
							dataType=EfwServerMessages.prototype.StringType;
						}
						result.alert(message,{
							"display-name":displayName,
							"min":min,
							"max":max,
							"data-type":dataType,
						})
						.highlight(errorElementKey)
						.focus(errorElementKey)
						.fail();
						continue;
					}
				}
			}
		}
		return result;
	}

	// clone the paramsFormat, if function exists, it will be run.
	var paramsFormat = JSON.clone(event.paramsFormat);
	var result= _check(requestParams, paramsFormat, "");
	if (result._object.alert){
		return result;
	}else{
		return null;
	}
};
/**
 * The function to fire event.
 * 
 * @param event:
 *            event object defined in your program.
 * @param requestParams:
 *            params from client.
 * @returns {null | Result | Event}
 */
EfwServer.prototype.fire = function(event, requestParams) {
	var needlogincheck = EfwServerProperties.prototype
			.getBoolean("efw.login.check");
	var loginkey = EfwServerProperties.prototype.get("efw.login.key");
	if (needlogincheck && !event.outOfLogin) { // the login check
		var vl = EfwServerSession.prototype.get(loginkey);
		if (vl == null || vl == "") {
			var result=(new Result())
			.alert(EfwServerMessages.prototype.SessionTimeoutException);
			var loginUrl = EfwServerProperties.prototype.get("efw.login.url","");
			if (loginUrl != "")result.navigate(loginUrl);
			return result;
		}
	}
	EfwServerDb.prototype.open(); // open database
	try {
		var result = event.fire(requestParams);
		if (result != null && result["_object"] != null
				&& result["_object"]["download"] != null) {// save download
			// info to session
			var download = result["_object"]["download"];
			var tmpfile = download.file;
			if (tmpfile == null)
				tmpfile = "";
			var tmpzip = download.zip;
			if (tmpzip == null)
				tmpzip = "";
			else
				tmpzip = tmpzip.join("|");
			var tmpdeleteafterdownload = download.deleteafterdownload;
			if (tmpdeleteafterdownload == null)
				tmpdeleteafterdownload = "";
			else
				tmpdeleteafterdownload = "" + tmpdeleteafterdownload;
			var tmpsaveas = download.saveas;
			if (tmpsaveas == null)
				tmpsaveas = "";
			EfwServerSession.prototype.set("efw.download.file", tmpfile);
			EfwServerSession.prototype.set("efw.download.zip", tmpzip);
			EfwServerSession.prototype.set("efw.download.deleteafterdownload",
					tmpdeleteafterdownload);
			EfwServerSession.prototype.set("efw.download.saveas", tmpsaveas);
		}
		;
		EfwServerDb.prototype.commit();
		EfwServerDb.prototype.closeAll();
		return result;
	} catch (e) {
		EfwServerDb.prototype.rollback();
		EfwServerDb.prototype.closeAll();
		throw e;
	}
};
