/**** efw3.X Copyright 2018 efwGrp ****/
/**
 * The class to read TXT.<br>
 * @param {String}
 *			path: required<br>
 * @param {String}
 *			regFieldsDef: required<br>
 * @param {String}
 *			encoding: optional<br>
 * @author Liu Xinyu
 */
function TXTReader(path, regFieldsDef, encoding) {
	this._path = path;
	this._regFieldsDef = regFieldsDef;
	if (encoding != null){this._encoding = encoding;}
};
/**
 * The attr to keep the path.
 */
TXTReader.prototype._path = null;
/**
 * The attr to keep the regFieldsDef.
 */
TXTReader.prototype._regFieldsDef = null;
/**
 * The attr to keep the encoding.
 */
TXTReader.prototype._encoding = "UTF-8";
/**
 * The function to read all lines into a matrix of arrays.
 * 
 * @returns {Array}
 */
TXTReader.prototype.readAllLines = function(){
	var aryLinesTemp = file.readAllLines(this._path).split("\n");
	var aryLines = [];

	for (var i = 0; i < aryLinesTemp.length; i++) {
		aryLines.push(this._split(aryLinesTemp[i]));
	}

	return aryLines;
};
/**
 * The function to loop all lines for callback function calling.
 * 
 * @param {Function}
 *            callback: required<br>
 * @returns {Array}
 */
TXTReader.prototype.loopAllLines = function(callback){
	var br=null;
	if (callback == null) {return;}
	try{
		br = new java.io.BufferedReader(
					new java.io.InputStreamReader(
						new java.io.FileInputStream(
							Packages.efw.file.FileManager.get(this._path)),
							this._encoding));
		var strLine;
		var intNum = 0;

		while ((strLine = br.readLine()) != null) {
			var aryField = this._split(strLine);

			callback(aryField, intNum);
			intNum++;
		}
	}finally{
		try{
			br.close();
		}catch(e){
		}
	}
};
/**
 * The inner function to split a string to array 
 * according to the regFieldsDef.
 * 
 * @param {String}
 *            rowdata: required<br>
 * @returns {Array}
 */
TXTReader.prototype._split = function (rowdata) {
	var regexp = new RegExp(this._regFieldsDef);
	var aryField = rowdata.match(regexp);

	if (aryField == null) {
		throw new Error("TXTDataError: Illegal Data");
	}

	for (var i = 1; i < aryField.length; i++) {
		aryField[i] = aryField[i].trim();
	}

	aryField.shift();

	return aryField;
};