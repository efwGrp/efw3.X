/**
 * The class as event result.
 * 
 * @author Chang Kejun
 */
function Result() {
	this._object = {};
	this._array = [];
};

/**
 * The array to keep action values.
 */
Result.prototype._object = null;
/**
 * The array to keep return values.
 */
Result.prototype._array = null;
/**
 * The function to add one return value in array.<br>
 * And create runat attribute to it.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Result}
 */
Result.prototype.runat = function(selector) {
	var ret = {};
	ret.runat = selector;
	this._array.push(ret);
	return this;
};
/**
 * The function to create remove attribute to last return value.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Result}
 */
Result.prototype.remove = function(selector) {
	if (this._array.length > 0) {
		var ret = this._array[this._array.length - 1];
		ret.remove = selector;
	}
	return this;
};
/**
 * The function to create append attribute to last return value.
 * 
 * @param {String}
 *            mask: required<br>
 * @returns {Result}
 */
Result.prototype.append = function(mask) {
	if (this._array.length > 0) {
		var ret = this._array[this._array.length - 1];
		ret.append = mask;
	}
	return this;
};
/**
 * The function to create widthdata attribute to last return value.
 * 
 * @param {Array |
 *            Object} data: required<br>
 * @returns {Result}
 */
Result.prototype.withdata = function(data) {
	if (this._array.length > 0) {
		var ret = this._array[this._array.length - 1];
		ret.withdata = data;
	}
	return this;
};
/**
 * The function to concatenate to another result.
 * 
 * @param {Result} result: required<br>
 * @returns {Result}
 */
Result.prototype.concat = function(result) {
	if(result){
		if(result._array){
			this._array = this._array.concat(result._array);
		}
		if(result._object){
			if (result._object.show)this.show(result._object.show);
			if (result._object.hide)this.hide(result._object.hide);
			if (result._object.disable)this.disable(result._object.disable);
			if (result._object.enable)this.enable(result._object.enable);
			if (result._object.navigate)this.navigate(result._object.navigate.url, this._object.navigate.params);
			if (result._object.download){
				if (result._object.download.zip)this.attach(result._object.download.zip);
				if (result._object.download.file)this.attach(result._object.download.file);
				if (result._object.download.deleteafterdownload)this.deleteAfterDownload();
			}
			if (result._object.alert)this.alert(result._object.alert);
			if (result._object.highlight)this.highlight(result._object.highlight);
			if (result._object.focus)this.focus(result._object.focus);
			if (result._object.fail)this.fail(result._object.fail);
		}		
	}
	return this;
};


/**
 * The function to show elements in client.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Result}
 */
Result.prototype.show = function(selector) {
	if (this._object.show==null){
		this._object.show=selector;
	}else{
		this._object.show+=","+selector;
	}
	return this;
};
/**
 * The function to hide elements in client.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Result}
 */
Result.prototype.hide = function(selector) {
	if (this._object.hide==null){
		this._object.hide=selector;
	}else{
		this._object.hide+=","+selector;
	}
	return this;
};
/**
 * The function to disable elements in client.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Result}
 */
Result.prototype.disable = function(selector) {
	if (this._object.disable==null){
		this._object.disable=selector;
	}else{
		this._object.disable+=","+selector;
	}
	return this;
};
/**
 * The function to enable elements in client.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Result}
 */
Result.prototype.enable = function(selector) {
	if (this._object.enable==null){
		this._object.enable=selector;
	}else{
		this._object.enable+=","+selector;
	}
	return this;
};
/**
 * The function to navigate to another page in client.
 * 
 * @param {String}
 *            url: required<br>
 * @param {Object}
 *            params: optional<br>
 * @returns {Result}
 */
Result.prototype.navigate = function(url,params) {
	if(!this._object.navigate){
		this._object.navigate={};
		this._object.navigate.url=url;
		this._object.navigate.params=params;
	}
	return this;
};
/**
 * The function to set download file or folder path(s).
 * 
 * @param {String |
 *            Array} path: required<br>
 * @returns {Result}
 */
Result.prototype.attach = function(path) {
	if (!this._object.download)this._object.download={};
	if (this._object.download.zip != null) {
		if (path instanceof Array) {
			this._object.download.zip = this._object.download.zip.concat(path);
		} else {
			this._object.download.zip.push(path);
		}
	} else if (this._object.download.file != null) {
		this._object.download.zip = [];
		this._object.download.zip.push(this._object.download.file);
		if (path instanceof Array) {
			this._object.download.zip = this._object.download.zip.concat(path);
		} else {
			this._object.download.zip.push(path);
		}
		delete this._object.download.file;
	} else {
		if (path instanceof Array) {
			this._object.download.zip = [];
			this._object.download.zip = this._object.download.zip.concat(path);
		} else if (EfwServerFile.prototype.isFolder(path)) {
			this._object.download.zip = [];
			this._object.download.zip = this._object.download.zip.concat(path);
		} else {
			this._object.download.file = path;
		}
	}
	return this;
};
/**
 * The function to set a flag to delete original files after download.
 * 
 * @returns {Result}
 */
Result.prototype.deleteAfterDownload = function() {
	if (this._object.download)	this._object.download.deleteafterdownload = true;
	return this;
};
/**
 * The function to show alert in client.
 * 
 * @param {String |
 *            Array} message: required<br>
 * @param {Object}
 *            params: optional<br>
 * @returns {Result}
 */
Result.prototype.alert = function(message, params) {
	if (!this._object.alert)
		this._object.alert = [];
	if (message instanceof Array) {
		this._object.alert = this._object.alert.concat(message);
	} else {
		for(var key in params){
			message=message.replace(new RegExp("{"+key+"}", "g"), params[key]);
		}
		this._object.alert.push(message);
	}
	return this;
};
/**
 * The function to highlight error elements.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Result}
 */
Result.prototype.highlight = function(selector) {
	if (this._object.highlight==null){
		this._object.highlight=selector;
	}else{
		this._object.highlight+=","+selector;
	}
	return this;
};
/**
 * The function to set focus to an element.
 * 
 * @param {String}
 *            selector: required<br>
 * @returns {Result}
 */
Result.prototype.focus = function(selector) {
	if (!this._object.focus)this._object.focus=selector;
	return this;
};
/**
 * The function to stop success callback.
 * 
 * @returns {Result}
 */
Result.prototype.fail = function() {
	this._object.fail=true;
	return this;
};
/**
 * The function to error.
 * 
 * @param {String}
 *            clientMessageId: required<br>
 * @param {Object}
 *            params: optional<br>
 * @returns {Result}
 */
Result.prototype.error = function(clientMessageId,params) {
	if (!this._object.error)
		this._object.error = {"clientMessageId":clientMessageId,"params":params};
	return this;
};

