/**** efw3.X Copyright 2016 efwGrp ****/
/**
 * The class to operate event at client.
 * 
 * @author Chang Kejun
 */
var EfwClient = function() {
};
/**
 * The object to keep the ajax options for retry.
 */
EfwClient.prototype._options=null;
/**
 * The function to fire event.
 * 
 * @param {Object}
 *            eventParams: required<br> {<br>
 *            eventId:String,required<br>
 *            manualParams:{},optional<br> }
 */
EfwClient.prototype.fire = function(eventParams) {
	var eventId = eventParams.eventId;
	var manualParams = eventParams.manualParams;
	EfwClient.prototype._consoleLog("First calling parameters", eventParams);
	// define of the return object
	// ---------------------------------------------------------------------
	// the first calling
	// ---------------------------------------------------------------------
	$(".efw_input_error").removeClass("efw_input_error");// clear input error
	EfwClient.prototype._displayLoading();
	var servletUrl = "efwServlet";
	if (eventParams.server){
		servletUrl = eventParams.server + "/" + servletUrl;
	}else{
		servletUrl = Efw.prototype.baseurl + "/" + servletUrl;
	}
	var uploadUrl = "uploadServlet";
	if (eventParams.server){
		uploadUrl = eventParams.server + "/" + uploadUrl;
	}else{
		uploadUrl = Efw.prototype.baseurl + "/" + uploadUrl;
	}
	$.ajax(EfwClient.prototype._options={
		url : servletUrl,
		type : "POST",// post method
		cache : false,// don't use cache
		async : true,// don't use async
		dataType : "json",// send or get data by json type
		// first calling only send groupid and eventid
		data : {
			"data" : JSON.stringify({
				"eventId" : eventId
			})
		},
		success : function(result) {
			EfwClient.prototype._consoleLog("First calling result", result);
			// if it is success,the result must be a json object.
			if (result.actions){
				EfwClient.prototype._showActions(result.actions);
				if(result.actions.error==null)EfwClient.prototype._removeLoading();
			} else {// if no error, run the second fire, in this case , result is paramsFormat
				EfwClient.prototype._fire2nd(eventId, result, manualParams, servletUrl, uploadUrl);
			}
		},
		error : function(errorResponse, errorType, errorMessage) {
			EfwClient.prototype._consoleLog("First calling error", {
				"errorResponse":errorResponse,
				"errorType":errorType,
				"errorMessage":errorMessage,
			});
			EfwClient.prototype._retryAjax();
		}
	});
};
/**
 * The function to show alert.
 * @param {String} message: required<br>
 * @param {Function} callback: optional<br>
 */
EfwClient.prototype.alert = function(message, buttons) {
	var isSmartPhone=false;
    var ua = navigator.userAgent;
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
    	isSmartPhone=true;//smart phone
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
    	isSmartPhone=false;//tablet
    } else {
        isSmartPhone=false;//pc
    }
    if ($("body").dialog) {
		$("#efw_client_alert").remove();
		var dialogButtons={};
		if(buttons){
			for(var key in buttons){
				window.eval("var EfwClientAlert_ButtonFunc=function(){"+
						"$('#efw_client_alert').dialog('close').remove();"+
						buttons[key]+";}");
				dialogButtons[key]=EfwClientAlert_ButtonFunc;
			};
		}else{
			dialogButtons["OK"]=function(){
				$("#efw_client_alert").dialog("close").remove();
			};
		}
		$("body")
				.append(
						"<div id='efw_client_alert' style='display:none'><p></p></div>");
		message = message.replace(/\n/g, "<br>");
		$("#efw_client_alert p").html(message);
		$("#efw_client_alert").dialog({
			dialogClass: isSmartPhone?"efw-smartphone-dialog":"",
			modal : true,
			width : isSmartPhone?"90%":500,
			title : "Message",
			buttons : dialogButtons,
			beforeClose : function(){
				EfwClient_showActions_MsgClosed=true;
			}
		});
	} else {
		alert(message);
		if (callback)
			callback();
	}
};
/**
 * The internal function to execute second ajax calling.
 * @param eventId
 * @param paramsFormat
 * @param manualParams
 * @param servletUrl
 * @param uploadUrl
 */
EfwClient.prototype._fire2nd = function(eventId, paramsFormat, manualParams, servletUrl, uploadUrl) {
	// auto collect params
	// ---------------------------------------------------------------------
	try {
		// the first calling return data is paramsformat,use it to get params
		var params = EfwClient.prototype._pickupParams(paramsFormat, null,
				manualParams);
		EfwClient.prototype._consoleLog("Second calling parameters", params);
	} catch (e) {
		EfwClient.prototype._consoleLog("Params format error", e);
		// the params can not be pickup, it is program error.
		EfwClient.prototype._showActions({"error":{"clientMessageId":"ParamsFormatErrorException","params":{"eventId":eventId}}});
		return;
	}
	// the second calling
	// ---------------------------------------------------------------------
	var callSecondAjax = function() {
		$.ajax(EfwClient.prototype._options={
			url : servletUrl,
			type : "POST",// post method
			cache : false,// don't use cache
			async : true,// don't use async
			dataType : "json",// send or get data by json type
			// first calling only send groupid and eventid
			data : {
				"data" : JSON.stringify({
					"eventId" : eventId,
					"params" : params
				})
			},
			success : function(result) {
				EfwClient.prototype._consoleLog(
						"Second calling result", result);
				//show values
				try {
					EfwClient.prototype._showValues(result.values);
				} catch (e) {
					EfwClient.prototype._consoleLog(
							"Result values error", e);
					EfwClient.prototype._showActions({"error":{"clientMessageId":"ResultValuesErrorException","params":{"eventId":eventId}}});
					return;
				}
				//show actions
				try {
					EfwClient.prototype._showActions(result.actions);
					if(result.actions.error==null)EfwClient.prototype._removeLoading();
				} catch (e) {
					EfwClient.prototype._consoleLog(
							"Result actions error", e);
					EfwClient.prototype._showActions({"error":{"clientMessageId":"ResultActionsErrorException","params":{"eventId":eventId}}});
					return;
				}					
			},
			error : function(errorResponse, errorType, errorMessage) {
				EfwClient.prototype._consoleLog("Second calling error", {
					"errorResponse":errorResponse,
					"errorType":errorType,
					"errorMessage":errorMessage,
				});
				EfwClient.prototype._retryAjax();
			}
		});
	};
	// upload files
	// ---------------------------------------------------------------------
	if (EfwClient.prototype._pickupParams_uploadformdata != null) {
		$.ajax(EfwClient.prototype._options={
			url : uploadUrl,
			type : "POST",// post method
			dataType : "json",// send or get data by json type
			cache : false,// don't use cache
			async : true,// don't use async
			processData : false,
			contentType : false,
			data : EfwClient.prototype._pickupParams_uploadformdata,// upload
			// files
			success : function(data) {
				callSecondAjax();
			},
			error : function(errorResponse, errorType, errorMessage) {
				EfwClient.prototype._consoleLog("Uploading error", {
					"errorResponse":errorResponse,
					"errorType":errorType,
					"errorMessage":errorMessage,
				});
				EfwClient.prototype._retryAjax();
			}
		});
		EfwClient.prototype._pickupParams_uploadformdata = null;// reset it for
		// next ajax.
	} else {
		callSecondAjax();
	}
};
/**
 * The internal object to keep upload form data.
 */
EfwClient.prototype._pickupParams_uploadformdata = null;
/**
 * The internal function to pickup params from web.
 * @param paramsFormat
 * @param context
 * @param manualParams
 * @returns {Object}
 */
EfwClient.prototype._pickupParams = function(paramsFormat, context,
		manualParams) {
	var data = {};
	for ( var key in paramsFormat) {
		var format = paramsFormat[key];
		var element;
		if (context == null) {
			element = $(key);
		} else {
			element = $(key, $(context));
		}
		var vl = null;
		// if format is null, it means the value should be a string.
		// if format is string exp 'yyyy/MM/dd',
		// it means the value should be parsed by the format in server.
		if (format == null || $.type(format) == "string") {
			if (element.length == 1) {
				var tgNm = element[0].tagName;
				if (tgNm == "INPUT" || tgNm == "SELECT" || tgNm == "TEXTAREA") {
					vl = element.val();
					if (element[0].type == "checkbox") {
						if (!element[0].checked) {
							vl = null;
						}
					} else if (element[0].type == "file") {
						if (vl != null && vl != "") {
							if (EfwClient.prototype._pickupParams_uploadformdata == null)
								EfwClient.prototype._pickupParams_uploadformdata = new FormData();
							EfwClient.prototype._pickupParams_uploadformdata
									.append("filename", $(element[0]).prop(
											"files")[0]);
						}
					}
				} else if (tgNm == "HTML") {
					// the next puzzle code is only for firefox
					$("input,button").each(function() {
						this.setAttribute('value', this.value);
					});
					$("textarea").each(function() {
						$(this).text(this.value);
					});
					$("input:radio,input:checkbox").each(function() {
						if (this.checked)
							this.setAttribute('checked', 'checked');
						else
							this.removeAttribute('checked');
					});
					$("option").each(function() {
						if (this.selected)
							this.setAttribute('selected', 'selected');
						else
							this.removeAttribute('selected');
					});
					vl = element.html();
				} else {
					vl = element.text();
				}
			} else if (element.length == 0) {
				var isMatched = false;
				if (manualParams != null) {
					vl = manualParams[key];
					if (vl != null) {
						isMatched = true;
					}
				}
				if (!isMatched) {
					throw "'" + key + "' is not matched to any element.";
				}
			} else {
				throw "'" + key + "' can not be matched to multiple elements.";
			}
		} else if ($.type(format) == "array") {
			if ($.type(format[0]) == "object") {
				var ary = [];
				$(element).each(
						function(idx, dom) {
							ary.push(EfwClient.prototype._pickupParams(
									format[0], dom, manualParams));
						});
				vl = ary;
			} else {
				throw "'" + key + "' in params format should be an object.";
			}
		} else if ($.type(format) == "object") {
			vl = EfwClient.prototype._pickupParams(format, element,
					manualParams);
		} else {
			throw "'" + key + "' in params format can not be a simple data.";
		}
		data[key] = vl;
	}
	return data;
};
/**
 * The internal function to show values to web.
 * @param values
 */
EfwClient.prototype._showValues = function(values) {
	if ((values instanceof Array) ==false) throw "The return values must be an array.";
	// return value to html
	// ---------------------------------------------------------------------
	// values is array of running data sample
	for (var running_idx = 0; running_idx < values.length; running_idx++) {
		var running = values[running_idx];
		// "runat" must match only one html object.
		var attr_runat = running["runat"];
		if (attr_runat == null || attr_runat == "")
			attr_runat = "body";
		var runat = $(attr_runat);

		var attr_removeeach = running["remove"];
		if (attr_removeeach != "" && attr_removeeach != null) {
			$(attr_removeeach, $(runat)).remove();
		}

		var withdata = running["withdata"];
		var attr_appendmask = running["append"];

		// if appendmask is nothing the withdata must be object
		// -----------------------------------------------------------------
		if (attr_appendmask == "" || attr_appendmask == null) {
			// if withdata is nothing, then do nothing
			if (withdata == null) {
				//continue;
				// if withdata is not object, then error
			} else if ($.type(withdata) != "object") {
				throw "If without appendmask,the withdata for [runat="
						+ attr_runat + "] should be an object.";
			} else {
				// try to show the data in withdata by the key.
				for ( var withdata_key in withdata) {
					var data = withdata[withdata_key];
					if (data == null)
						data = "";// if data isnull then change it to blank
					if ($.type(data) != "string" && $.type(data) != "number"
							&& $.type(data) != "date"
							&& $.type(data) != "boolean") {
						throw "The data " + data
								+ " in withdata of [runat=" + attr_runat
								+ "] should be a simple type.";
					}
					// you can only set data to the html range of runat
					// you can not set data both in and out of runat
					$(withdata_key, $(runat)).each(function() {
						// set data with checked attribute
						if ((this.tagName == "INPUT" && this.type == "checkbox") || (this.tagName == "INPUT" && this.type == "radio")) {
							if (withdata[withdata_key] == $(
									this).val()) {
								$(this).prop("checked", true);
							} else {
								$(this).prop("checked", false);
							}
						// set data to value attribute
						} else if ( this.tagName == "INPUT" || this.tagName == "TEXTAREA") {
							$(this).val(data);
						// set data with selected attribute
						} else if ( this.tagName == "SELECT" ) {
							var dataAry = ("" + data)
									.split(",");
							$("option", $(this)).removeAttr(
									"selected");
							for (var dataAry_idx = 0; dataAry_idx < dataAry.length; dataAry_idx++) {
								$("option", $(this))
										.each(
												function() {
													if (this.value == dataAry[dataAry_idx]) {
														this.selected = true;
													}
												});
							}
						} else {// set data to text
							$(this).text(data);
						}
					});
				}
			}
			// -----------------------------------------------------------------
		} else {
			if ($.type(attr_appendmask) != "string") {
				throw "Appendmask should be a string.";
			}
			// if return data is nothing, then do nothing
			if (withdata == null) {
				//continue;
				// if return data is not array, then error
			} else if ($.type(withdata) != "array") {
				throw "If with appendmask,the withdata for [runat="
						+ attr_runat + "] should be an array of object.";
			} else {
				$(runat).each(function() {
					for (var withdata_idx = 0; withdata_idx < withdata.length; withdata_idx++) {
						var dataRow = withdata[withdata_idx];
						if ($.type(dataRow) != "object") {
							throw "The withdata for [runat="
									+ attr_runat
									+ "] should be an array of object.";
						}
						var temp_appendmask = attr_appendmask;
						for ( var dataRow_key in dataRow) {
							var data = dataRow[dataRow_key];
							if (data == null) {
								data = "";
							} else {
								data = "" + data;
							}// if data isnull then change it
							// to blank
							temp_appendmask = temp_appendmask
									.split(
											"{{" + dataRow_key
													+ "}}")
									.join(data);
							data = data.replace(/&/g, '&amp;')
									.replace(/>/g, '&gt;')
									.replace(/</g, '&lt;')
									.replace(/"/g, '&quot;')
									.replace(/'/g, '&#39;');
							temp_appendmask = temp_appendmask
									.split(
											"{" + dataRow_key
													+ "}")
									.join(data);
						}
						$(this).append(temp_appendmask);
					}
				});
			}
		}
	}
};
/**
 * The internal function to show actions to web.
 * @param actions
 */
var EfwClient_showActions_Downloaded=true;//true if download is over
var EfwClient_showActions_MsgClosed=true;//true if alert is closed
var EfwClient_showActions_Evaled=true;//true if script is run
var EfwClient_showActions_Download_Handle=null;//keep the handle of interval
var EfwClient_showActions_Navigate_Handle=null;//keep the handle of interval
var EfwClient_showActions_Eval_Handle=null;//keep the handle of interval

EfwClient.prototype._showActions = function(actions) {
	if ((actions instanceof Array)) throw "The return actions must be an object.";
	//-------------------------------------------------------------------------
	if (actions.error){
		var message=EfwClientMessages.prototype[actions.error.clientMessageId];
		if (message==null)throw "No client message is defined for [error="+actions.error.clientMessageId+"].";
		var params=actions.error.params;
		if (params){
			for(var key in params){
				message=message.replace(new RegExp("{"+key+"}", "g"), params[key]);
			}
		}
		EfwClient_showActions_MsgClosed=false;
		EfwClient.prototype.alert(message);
		EfwClient.prototype._removeLoading();//to close loading, or the dialog is not touchable.
		//if the error is occured from client, the loading will be shown after dialog closed.
		EfwClient_showActions_Eval_Handle=window.setInterval(function(){
			if(EfwClient_showActions_MsgClosed){
				window.clearInterval(EfwClient_showActions_Eval_Handle);
				window.eval("EfwClient.prototype._displayLoading();");
			}
		}, 100);
		//if the error is occured from server, the error jsp will be shown after dialog closed.
		EfwClient_showActions_Navigate_Handle=window.setInterval(function(){
			if(EfwClient_showActions_MsgClosed){
				window.clearInterval(EfwClient_showActions_Navigate_Handle);
				if (actions.navigate){
					var url=actions.navigate.url;
					if (actions.navigate.params!=null){
						url+=(url.indexOf("?")>-1? "&":"?")+$.param(actions.navigate.params);
					}
					window.open(url, "_self");
				}
			}
		}, 100);
		return;
	}
	if (actions.show)$(actions.show).show();
	if (actions.hide)$(actions.hide).hide();
	if (actions.enable)$(actions.enable).prop("disabled",false);
	if (actions.disable)$(actions.disable).prop("disabled",true);
	if (actions.highlight)$(actions.highlight).addClass("efw_input_error");;
	//-------------------------------------------------------------------------
	if (actions.download){
		EfwClient_showActions_Downloaded=false;
		window.location = Efw.prototype.baseurl+"/downloadServlet";
		EfwClient_showActions_Download_Handle = window.setInterval(function(){
			if (Cookies.get("efw_Downloaded")) {
				Cookies.remove("efw_Downloaded",{path : "/"});
				window.clearInterval(EfwClient_showActions_Download_Handle);
				EfwClient_showActions_Downloaded=true;
			}
		}, 1000);
	}else{
		EfwClient_showActions_Downloaded=true;
	}
	//-------------------------------------------------------------------------
	if (actions.confirm){
		EfwClient_showActions_MsgClosed=false;
		var message=actions.confirm.message;
		if (actions.alert)message=actions.alert.join("\n")+"\n"+message;
		EfwClient.prototype.alert(message, actions.confirm.buttons);
	}else if (actions.alert){
		EfwClient_showActions_MsgClosed=false;
		EfwClient.prototype.alert(actions.alert.join("\n"));
	}else{
		EfwClient_showActions_MsgClosed=true;
	}
	//-------------------------------------------------------------------------
	if (actions.eval){
		EfwClient_showActions_Evaled=false;
		if(EfwClient_showActions_MsgClosed&&EfwClient_showActions_Downloaded){
			window.eval(actions.eval.join(";"));
			EfwClient_showActions_Evaled=true;
		}else{
			EfwClient_showActions_Eval_Handle=window.setInterval(function(){
				if(EfwClient_showActions_MsgClosed&&EfwClient_showActions_Downloaded){
					window.clearInterval(EfwClient_showActions_Eval_Handle);
					window.eval(actions.eval.join(";"));
					EfwClient_showActions_Evaled=true;
				}
			}, 100);
		}
	}
	//-------------------------------------------------------------------------
	if(EfwClient_showActions_MsgClosed&&EfwClient_showActions_Downloaded&&EfwClient_showActions_Evaled){
		try{if (actions.focus)$(actions.focus).focus();}catch(e){}
		if (actions.navigate){
			var url=actions.navigate.url;
			if (actions.navigate.params!=null){
				url+=(url.indexOf("?")>-1? "&":"?")+$.param(actions.navigate.params);
			}
			window.open(url, "_self");
		}
	}else{
		EfwClient_showActions_Navigate_Handle=window.setInterval(function(){
			if(EfwClient_showActions_MsgClosed&&EfwClient_showActions_Downloaded){
				window.clearInterval(EfwClient_showActions_Navigate_Handle);
				try{if (actions.focus)$(actions.focus).focus();}catch(e){}
				if (actions.navigate){
					var url=actions.navigate.url;
					if (actions.navigate.params!=null){
						url+=(url.indexOf("?")>-1? "&":"?")+$.param(actions.navigate.params);
					}
					window.open(url, "_self");
				}
			}
		}, 100);
	}
	
};
/**
 * The internal function to show log to console.
 * @param msg
 * @param data
 */
EfwClient.prototype._consoleLog = function(msg, data) {
	if (window.console) {
		var date = new Date();
		var format = 'YYYY-MM-DD hh:mm:ss.SSS';
		format = format.replace(/YYYY/g, date.getFullYear());
		format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
		format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
		format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
		format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
		format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
		if (format.match(/S/g)) {
			var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
			var length = format.match(/S/g).length;
			for (var i = 0; i < length; i++)
				format = format.replace(/S/, milliSeconds.substring(i, i + 1));
		}
		console.log(format + " " + msg + " = " + JSON.stringify(data));
	}
};
/**
 * The internal function to display loading mask.
 * waitting 100ms before mask the screen.
 */
var EfwClient_displayLoading_handle=null;
EfwClient.prototype._displayLoading = function() {
	$("#loading").remove();
	$("body").append("<div id='loading' style='z-index:9999'></div>");
	EfwClient_displayLoading_handle=window.setTimeout(function(){
		 $("#loading").addClass("ui-widget-overlay ui-front");
	}, 100);
};
/**
 * The internal function to remove loading mask.
 */
EfwClient.prototype._removeLoading = function() {
	if(EfwClient_displayLoading_handle)window.clearTimeout(EfwClient_displayLoading_handle);
	$("#loading").remove();
};


EfwClient.prototype._retryAjax = function() {
	EfwClient.prototype.alert(EfwClientMessages.prototype.CommunicationErrorException,{"OK":"$.ajax(EfwClient.prototype._options)","Cancel":""});
};