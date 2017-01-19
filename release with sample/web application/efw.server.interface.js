/**** efw3.X Copyright 2016 efwGrp ****/
/**
 * efw framework server library
 * @author Chang Kejun
 */
///////////////////////////////////////////////////////////////////////////////
/**
 * The class for rule engine calling
 * 
 * @author Chang kejun
 */
function EfwServerBRMS() {};
/**
 * The function to get a rule by its Id.
 * @param {String} ruleId: required<br>
 * @param {Object} params: required<br>
 *            {param1:value1,param2:value2,...}<br>
 * @param {Date} ruleDate: optional<br>
 * @returns {Record}
 */
EfwServerBRMS.prototype.getRuleById = function(ruleId, params, ruleDate) {return null;};
/**
 * The function to get a rule by its name.
 * @param {String} ruleName: required<br>
 * @param {Object} params: required<br>
 *            {param1:value1,param2:value2,...}<br>
 * @param {Date} ruleDate: optional<br>
 * @returns {Record}
 */
EfwServerBRMS.prototype.getRuleByName = function(ruleName, params, ruleDate) {return null;};
/**
 * The function to get a rule by its Alias.
 * @param {String} ruleAlias: required<br>
 * @param {Object} params: required<br>
 *            {param1:value1,param2:value2,...}<br>
 * @param {Date} ruleDate: optional<br>
 * @returns {Record}
 */
EfwServerBRMS.prototype.getRuleByAlias = function(ruleAlias, params, ruleDate) {return null;};
///////////////////////////////////////////////////////////////////////////////
/**
 * The class to operate cookie.
 */
function EfwServerCookie() {};
/**
 * The function to get data from cookie.
 * 
 * @param {String}
 *            key: the cookie key.
 * @returns {String}
 */
EfwServerCookie.prototype.get = function(key) {return null;};
/**
 * The function to set data in cookie.
 * 
 * @param {String}
 *            key: the cookie key.
 * @param {String}
 *            value: the data you want to set in cookie.
 */
EfwServerCookie.prototype.set = function(key, value) {};
///////////////////////////////////////////////////////////////////////////////
/**
 * The class to operate Database.
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
EfwServerDb.prototype.change = function(groupId, sqlId, params, jdbcResourceName) {return 0;};
/**
 * The function to operate master data in memory.
 * 
 * @param {String}
 *            masterId: required<br>
 * @param {Boolean}
 *            reload
 * @returns {Record}
 */
EfwServerDb.prototype.master=function(masterId, reload) {return null;};

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
EfwServerDb.prototype.select =function(groupId, sqlId, params, jdbcResourceName) {return null;};
///////////////////////////////////////////////////////////////////////////////
/**
 * The class to operate event.
 */
function EfwServerEvent() {};
/**
 * The function to fire another event in an event firing.
 * 
 * @param {String}
 *            eventId: required<br>
 * @param {Object}
 *            params: required<br>
 *            {param1:value1,param2:value2,...}<br>
 * @returns {Result}
 */
EfwServerEvent.prototype.fire = function(eventId, params) {return null;};
///////////////////////////////////////////////////////////////////////////////
/**
 * The class to operate Excel.<br>
 * Do not try to open a same file more than once in an event.
 * @param {String}
 *            path: required<br>
 * Even you want to create a new excel file, you must create it from a template file.
 */
function Excel(path) {};
/**
 * The function to save the excel object to a file.
 * @param {String} path: required. <br>
 * The relative path and file name to the storage folder.
 */
Excel.prototype.save = function(path) {return this;};
/**
 * The function to delete the excel file.
 */
Excel.prototype.remove = function() {};
/**
 * The function to close the handle to free the excel file.
 */
Excel.prototype.close = function() {};
/**
 * The function to get the last row number starting from 1.
 * @param {String}
 *            sheetName: required<br>
 * @returns {Number}
 */
Excel.prototype.getMaxRow = function(sheetName) {return 0;};
/**
 * The function to get the last column number starting from 1.
 * @param {String}
 *            sheetName: required<br>
 * @returns {Number}
 */
Excel.prototype.getMaxCol = function(sheetName) {return 0;};
/**
 * The function to get several fields as an array from a sheet.
 * @param {String}
 *            sheetName: required<br>
 * @param {Number} startRow: required<br>
 * 			It starts from 1 not 0 . <br>
 * @param {Number|function} endCondition: required<br>
 * 			999|function(row){return true/false;} // The parameter row starts from 1 not 0 .<br>
 * @param {Object|Array} positionRowMaps: required<br>
 * 			[{<br>//the first row in one record
 * 				"data1":col,	// The col is "A","B","C" and etc.<br>
 * 				"data2":[col,formatter,rounder]<br>
 *            	"data3":function(row){return String|Number|Date|Boolean;}<br> 
 * 			},{//the second row in one record
 * 				...
 * 			}]
 * 
 */
Excel.prototype.getArray = function(sheetName, startRow, endCondition, positionRowMaps){return null;};

/**
 * The function to get several fields as an object from a sheet.<br>
 * And you can format the value to String by the formatter in positionMap.<br>
 * @param {String}
 *            sheetName: required<br>
 * @param {Object}
 * 			positionMap: required<br> 
 *            { <br> 
 *            	"data1":position, //row col are required<br> 
 *            	"data2":[position,formatter,rounder] //formatter rounder are optional<br> 
 *            	"data3":function(){return String|Number|Date|Boolean;}<br> 
 *            }<br> 
 * @returns {Object}
 */
Excel.prototype.getSingle = function(sheetName, positionMap) {return null;};

/**
 * The function to get the value from a cell.<br>
 * And you can format the value to String by the formatter parameter.<br>
 * 
 * @param {String}
 *            sheetName: required<br>
 * @param {Number}
 *            position: required<br>
 *            Example: "A1" etc.
 * @param {String}
 *            formatter: optional<br>
 * @param {String}
 *            rounder : optional, the default is HALF_EVEN<br>
 *            {UP | DOWN | CEILING | FLOOR | HALF_UP | HALF_DOWN | HALF_EVEN}<br>
 * @returns {String | Number | Date | Boolean}
 */
Excel.prototype.getValue = function(sheetName, position, formatter, rounder) {return null;};
/**
 * The function to get the Array of sheet names.
 * @returns {Array}
 */
Excel.prototype.getSheetNames = function(){return null;};

/**
 * The function to create a new sheet or clone a existed sheet.
 * @param {String} sheetName: required<br>
 * 		The new sheet name.
 * @param {String} copyFrom: optional<br>
 * 		The existed sheet name.
 * @returns {Excel}
 */
Excel.prototype.createSheet = function(sheetName,copyFrom) {return this;};
/**
 * The function to remove a sheet.
 * @param {String} sheetName: required<br>
 * @returns {Excel}
 */
Excel.prototype.removeSheet = function(sheetName){return this;};
/**
 * The function to move a sheet's position.
 * @param {String} sheetName: required<br>
 * @param {Number} order: required, start from 1.<br>
 * @returns {Excel}
 */
Excel.prototype.setSheetOrder = function(sheetName,order){return this;};
/**
 * The function to set a sheet to be active.
 * @param {String} sheetName: required<br>
 * @returns {Excel}
 */
Excel.prototype.setActiveSheet = function(sheetName){return this;};
/**
 * The function to set a value and style etc into a cell.
 * @param {String} sheetName: required<br>
 * @param {String} position: required<br>
 * @param {String | Number | Date | Boolean | null } value: required<br>
 * If value is null, it will try to set the formula.
 * @param {String} templateSheetName: optional<br>
 * @param {String} templatePosition: optional<br>
 * @returns {Excel}
 */
Excel.prototype.setCell = function(sheetName, position, value, templateSheetName, templatePosition) {return this;};
/**
 * The function to judge whether a point is encircled by a shape or not.
 * @param {String}
 *            sheetName: required<br>
 * @param {Number}
 *            position: required<br>
 *            Example: "A1" etc.
 * @param {Number} checkpointXRate: optoinal<br>
 * The default value is 0.5 which means the center.<br>
 * @param {Number} checkpointYRate: optoinal<br>
 * The default value is 0.5 which means the center.<br>
 * @returns {Boolean}
 */
Excel.prototype.isEncircled=function(sheetName,position,checkpointXRate,checkpointYRate){return true;};

/**
 * The function to create a shape by coping to encircle a cell.
 * @param {String} sheetName: required<br>
 * @param {String} position: required<br>
 * @param {String | Number | Date | Boolean | null } value: required<br>
 * If value is null, it will try to set the formula.
 * @param {String} templateSheetName: required<br>
 * The sheet where the copied shape is.<br> 
 * @param {String} templateShapeName: required<br>
 * The name of the copied shape.
 * @param {Number} shapeCenterXRate: optional, the default is 0.5 .<br>
 * The rate of the created shape's center to the width of the cell.<br>
 * @param {Number} shapeCenterYRate optional, the default is 0.5 .<br>
 * The rate of the created shape's center to the height of the cell.<br>
 * @param {Number} shapeWidthRate optional, the default is 0.5 .<br>
 * The rate of the created shape's width to the width of the cell.<br>
 * @param {Number} shapeHeightRate optional, the default is 0.5 .<br>
 * The rate of the created shape's height to the height of the cell.<br>
 * @returns {Excel}
 */
Excel.prototype.encircle= function(sheetName,position,templateSheetName,templateShapeName,shapeCenterXRate,shapeCenterYRate,shapeWidthRate,shapeHeightRate){return this;};
///////////////////////////////////////////////////////////////////////////////
/**
 * The function to format the Number self to String. 
 * @param {String}
 *            formatter: required<br>
 * @param {String}
 *            rounder : optional, the default is HALF_EVEN<br>
 *            {UP | DOWN | CEILING | FLOOR | HALF_UP | HALF_DOWN | HALF_EVEN}<br>
 * @returns {String}
 */
Number.prototype.format=function(formatter, rounder){return null;};
/**
 * The function to parse the value to Number.
 * @param {String} value: required<br>
 * @param {String} formatter: required<br>
 * @returns {Number}
 */
Number.parse=function(value,formatter){return 0;};
/**
 * The function to format the Date self to String. 
 * @param {String}
 *            formatter: required<br>
 * @returns {String}
 */
Date.prototype.format=function(formatter){return null;};
/**
 * The function to parse the value to Date.
 * @param {String} value: required<br>
 * @param {String} formatter: required<br>
 * @returns {Date}
 */
Date.parse=function(value,formatter){return null;};
///////////////////////////////////////////////////////////////////////////////
/**
 * The class to send mail.
 */
function EfwServerMail() {
};
/**
 * The function to send mail.
 * 
 * @param {String}
 *            groupId: required<br>
 * @param {String}
 *            mailId: required<br>
 * @param {Object}
 *            params: required<br>
 *            {param1:value1,param2:value2,...}<br>
 */
EfwServerMail.prototype.send = function(groupId, mailId, params) {};
///////////////////////////////////////////////////////////////////////////////
/**
 * The class to operate pdf files.
 */
function EfwServerPdf() {};
/**
 * The function to create a pdf from a relative url to the web application,<br> 
 * and save it as the relative path to the storage folder.
 * @param {String} url: required<br>
 * @param {String} savePath: required<br>
 * @returns {EfwServerPdf}
 */
EfwServerPdf.prototype.create = function(url, savePath) {};
/**
 * The function to merge all pdfs in a relative folder to the storage folder,<br> 
 * and save it as the relative path to the storage folder.
 * @param {String} folder: required<br>
 * @param {String} savePath: required<br>
 * @returns {EfwServerPdf}
 */
EfwServerPdf.prototype.merge = function(folder, savePath) {};
///////////////////////////////////////////////////////////////////////////////
/**
 * The class to operate efw.properties file.
 */
function EfwServerProperties() {};
/**
 * The function to get String value from efw.properties file.
 * 
 * @param {String}
 *            key: required<br>
 * @param {String}
 *            defaultValue: optional<br>
 * @returns {any}
 */
EfwServerProperties.prototype.get = function(key, defaultValue) {return null;};
///////////////////////////////////////////////////////////////////////////////
/**
 * The class to operate the array data.
 * 
 * @param {Array}
 *            array: optional<br>
 */
function Record(array) {};

/**
 * The internal variable for keeping records length.
 */
Record.prototype.length = 0;
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
 * @returns {Record}
 */
Record.prototype.seek = function(field, action, value) {return this;};
/**
 * Sort records.<br>
 * The action is one of the options: [ asc | desc ]
 * 
 * @param {String}
 *            field: required<br>
 * @param {String}
 *            action: required<br>
 * @returns {Record}
 */
Record.prototype.sort = function(field, action) {return this;};
/**
 * The function to change the record format.
 * 
 * @param mapping:
 *            required<br>
 *            {fieldnew1:fieldold1,fieldnew2:fieldold2,...}<br>
 * @returns {Record}
 */
Record.prototype.map = function(mapping) {return this;};
/**
 * The function to get the first data item from records.
 * 
 * @returns {Object}
 */
Record.prototype.getSingle = function() {return null;};
/**
 * The function to get the array data from records.
 * 
 * @returns {Array}
 */
Record.prototype.getArray = function() {return null;};
/**
 * The function to get a field value from the first data of records.
 * 
 * @param {String}
 *            field: required<br>
 * @returns {String | Number | Date | Boolean}
 */
Record.prototype.getValue = function(field) {return null;};
///////////////////////////////////////////////////////////////////////////////
/**
 * The class as event result.
 */
function Result() {};
/**
 * The function to add one return value in the result.<br>
 * And create runat attribute to it.
 * 
 * @param {String}
 *            selector: optional<br>
 * @returns {Result}
 */
Result.prototype.runat = function(selector) {return this;};
/**
 * The function to create remove attribute to last return value.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Result}
 */
Result.prototype.remove = function(selector) {return this;};
/**
 * The function to create append attribute to last return value.
 * 
 * @param {String}
 *            mask: required<br>
 * @returns {Result}
 */
Result.prototype.append = function(mask) {return this;};
/**
 * The function to create widthdata attribute to last return value.
 * 
 * @param {Array |
 *            Object} data: required<br>
 * @returns {Result}
 */
Result.prototype.withdata = function(data) {return this;};
/**
 * The function to concatenate to another result.
 * 
 * @param {Result} result: required<br>
 * @returns {Result}
 */
Result.prototype.concat = function(result) {return this;};


/**
 * The function to show elements in client.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Result}
 */
Result.prototype.show = function(selector) {return this;};
/**
 * The function to hide elements in client.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Result}
 */
Result.prototype.hide = function(selector) {return this;};
/**
 * The function to disable elements in client.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Result}
 */
Result.prototype.disable = function(selector) {return this;};
/**
 * The function to enable elements in client.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Result}
 */
Result.prototype.enable = function(selector) {return this;};
/**
 * The function to navigate to another page in client.
 * 
 * @param {String}
 *            url: required<br>
 * @param {Object}
 *            params: optional<br>
 * @returns {Result}
 */
Result.prototype.navigate = function(url,params) {return this;};
/**
 * The function to set download file or folder path.
 * 
 * @param {String |
 *            Array} path: required<br>
 * @returns {Result}
 */
Result.prototype.attach = function(path) {return this;};
/**
 * The function to set a flag to delete original files after download.
 * 
 * @returns {Result}
 */
Result.prototype.deleteAfterDownload = function() {return this;};
/**
 * The function to show alert in client.
 * 
 * @param {String |
 *            Array} message: required<br>
 * @param {Object}
 *            params: optional<br>
 * @returns {Result}
 */
Result.prototype.alert = function(message, params) {return this;};
/**
 * The function to highlight error elements.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Result}
 */
Result.prototype.highlight = function(selector) {return this;};
/**
 * The function to set focus to an element.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Result}
 */
Result.prototype.focus = function(selector) {return this;};
/**
 * The function to error.
 * 
 * @param {String}
 *            clientMessageId: required<br>
 * @param {Object}
 *            params: optional<br>
 * @returns {Result}
 */
Result.prototype.error = function(clientMessageId,params) {return this;};
/**
 * The function to confirm.
 * 
 * @param {String}
 *            message: required<br>
 * @param {Object}
 *            buttons: required<br>
 * @param {Object}
 *            params: optional<br>
 * @returns {Result}
 */
Result.prototype.confirm = function(message, buttons, params) {return this;};
/**
 * The function to execute script.
 * @param {String} script: required<br>
 * @returns {Result}
 */
Result.prototype.eval = function(script){return this;};
///////////////////////////////////////////////////////////////////////////////
/**
 * The class to operate session.
 */
function EfwServerSession() {};
/**
 * The function to get data from session.
 * 
 * @param {String}
 *            key: the session key.
 * @returns {Any}
 */
EfwServerSession.prototype.get = function(key) {return null;};
/**
 * The function to set data in session.
 * 
 * @param {String}
 *            key: the session key.
 * @param {Any}
 *            value: the data you want to set in session.
 */
EfwServerSession.prototype.set = function(key, value) {};
/**
 * The function to create a new session.
 */
EfwServerSession.prototype.create = function() {};
/**
 * The function to invalidate the current session.
 */
EfwServerSession.prototype.invalidate = function() {};
///////////////////////////////////////////////////////////////////////////////
/**
 * The class to operate barcode files.
 * @author Chang Kejun
 */
function EfwServerBarcode() {
};
/**
 * The function to decode a barcode from an image file.<br> 
 * @param {String} imagePath: required<br>
 * @returns {String|null}
 */
EfwServerBarcode.prototype.decode = function(imagePath) {
	return null;
};
///////////////////////////////////////////////////////////////////////////////
String.prototype.debug = function(label) {return this;};
Number.prototype.debug = function(label) {return this;};
Boolean.prototype.debug = function(label) {return this;};
Date.prototype.debug = function(label) {return this;};
Array.prototype.debug = function(label) {return this;};
Function.prototype.debug = function(label) {return this;};
Object.prototype.debug = function(label) {return this;};
Record.prototype.debug = function(label) {return this;};
Result.prototype.debug = function(label) {return this;};
Excel.prototype.debug = function(label) {return this;};
///////////////////////////////////////////////////////////////////////////////
/**
 * properties
 */
var properties = new EfwServerProperties();
/**
 * session
 */
var session = new EfwServerSession();
/**
 * db
 */
var db = new EfwServerDb();
/**
 * event
 */
var event = new EfwServerEvent();
/**
 * file
 */
var file = new EfwServerFile();
/**
 * brms
 */
var brms = new EfwServerBRMS();
/**
 * mail
 */
var mail =new EfwServerMail();
/**
 * pdf
 */
var pdf = new EfwServerPdf();
/**
 * cookie
 */
var cookie =new EfwServerCookie();
/**
 * barcode
 */
var barcode =new EfwServerBarcode();