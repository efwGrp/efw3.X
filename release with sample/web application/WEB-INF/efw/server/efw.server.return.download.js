/**
 * The class to download files from server.
 * 
 * @param {String |
 *            Array} path: required<br>
 * @author Chang Kejun
 */
function Download(path) {
	this._object = {
		"download" : {}
	};
	if (path != null)
		this.attach(path);
};
/**
 * The object to keep download information.
 */
Download.prototype._object = null;
/**
 * The function to set download file or folder path(s).
 * 
 * @param {String |
 *            Array} path: required<br>
 * @returns {Download}
 */
Download.prototype.attach = function(path) {
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
 * The function to set a default file name when downloading at client.
 * 
 * @param {String}
 *            fileName: required<br>
 * @returns {Download}
 */
Download.prototype.saveAs = function(fileName) {
	this._object.download.saveas = fileName;
	return this;
};
/**
 * The function to set a flag to delete original files after download.
 * 
 * @returns {Download}
 */
Download.prototype.deleteAfterDownload = function() {
	this._object.download.deleteafterdownload = true;
	return this;
};
