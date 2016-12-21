/**** efw3.X Copyright 2016 efwGrp ****/
/**
 * The class to operate file in storage.
 * 
 * @author Chang Kejun
 */
function EfwServerFile() {
};

/**
 * The function to judge whether a path exists or not. 
 * @param {String} path
 * @returns {Boolean}
 */
EfwServerFile.prototype.exists=function(path){
	var fl = Packages.efw.file.FileManager.get(path);
	if (fl.exists()) {
		return true;
	}else{
		return false;
	}
};
/**
 * The function to judge whether a path is File or not. 
 * @param {String} path
 * @returns {Boolean}
 */
EfwServerFile.prototype.isFile=function(path){
	var fl = Packages.efw.file.FileManager.get(path);
	if (fl.isFile()) {
		return true;
	}else{
		return false;
	}
};
/**
 * The function to judge whether a path is Folder or not. 
 * @param {String} path
 * @returns {Boolean}
 */
EfwServerFile.prototype.isFolder=function(path){
	var fl = Packages.efw.file.FileManager.get(path);
	if (fl.isDirectory()) {
		return true;
	}else{
		return false;
	}
};
/**
 * The function to get all files infomation in the relative folder path to the
 * storage folder.
 * 
 * @param {String}
 *            path: required<br>
 * @param {String}
 *            ext: optional<br>
 * @returns {Array}
 */
EfwServerFile.prototype.listFiles = function(path, ext) {
	var lst = null;
	if (ext == null || ext == "") {
		lst = Packages.efw.file.FileManager.getList(path);
	} else {
		lst = Packages.efw.file.FileManager.getListByExt(path, ext);
	}
	var ret = [];
	for (var i = 0; i < lst.length; i++) {
		var fl = lst[i];
		if (true && fl.isFile()) {
			var lastModified = new Date();
			lastModified.setTime(fl.lastModified());
			var data = {
				"name" : "" + fl.getName(),
				"length" : 0 + fl.length(),
				"lastModified" : lastModified,
				"absolutePath" : "" + fl.getAbsolutePath(),
			};
			ret.push(data);
		}
	}
	return ret;
};
/**
 * The function to get all folders infomation in the relative folder path to the
 * storage folder.
 * 
 * @param {String}
 *            path: required<br>
 * @returns {Array}
 */
EfwServerFile.prototype.listFolders = function(path) {
	var lst = Packages.efw.file.FileManager.getList(path);
	var ret = [];
	for (var i = 0; i < lst.length; i++) {
		var fl = lst[i];
		if (true && fl.isDirectory()) {
			var lastModified = new Date();
			lastModified.setTime(fl.lastModified());
			var data = {
				"name" : "" + fl.getName(),
				"length" : 0 + Packages.efw.file.FileManager.getFolderSize(fl),
				"lastModified" : lastModified,
				"absolutePath" : "" + fl.getAbsolutePath(),
			};
			ret.push(data);
		}
	}
	return ret;
};
/**
 * The function to get the information of the relative file path to the storage
 * folder.
 * 
 * @param {String}
 *            path: required<br>
 * @returns {null | Object}
 */
EfwServerFile.prototype.getFileInfo = function(path) {
	var fl = Packages.efw.file.FileManager.get(path);
	if (true && fl.isFile()) {
		var lastModified = new Date();
		lastModified.setTime(fl.lastModified());
		var data = {
			"name" : "" + fl.getName(),
			"length" : 0 + fl.length(),
			"lastModified" : lastModified,
			"absolutePath" : "" + fl.getAbsolutePath(),
		};
		return data;
	} else {
		return null;
	}
};
/**
 * The function to get the information of the relative folder path to the
 * storage folder.
 * 
 * @param {String}
 *            path: required<br>
 * @returns {null | Object}
 */
EfwServerFile.prototype.getFolderInfo = function(path) {
	var fl = Packages.efw.file.FileManager.get(path);
	if (true && fl.isDirectory()) {
		var lastModified = new Date();
		lastModified.setTime(fl.lastModified());
		var data = {
			"name" : "" + fl.getName(),
			"length" : 0 + Packages.efw.file.FileManager.getFolderSize(fl),
			"lastModified" : lastModified,
			"absolutePath" : "" + fl.getAbsolutePath(),
		};
		return data;
	} else {
		return null;
	}
};
/**
 * The function to remove a file or a folder by the relative path to the storage
 * folder.
 * 
 * @param {String}
 *            path: required<br>
 */
EfwServerFile.prototype.remove = function(path) {
	Packages.efw.file.FileManager.remove(path);
};
/**
 * The function to get the absolute path of the storage folder.
 * 
 * @returns {String}
 */
EfwServerFile.prototype.getStorageFolder = function() {
	return "" + Packages.efw.file.FileManager.getStorageFolder();
};
/**
 * The function to save update files in the relative path to the storage folder.
 * 
 * @param {String}
 *            path: required<br>
 */
EfwServerFile.prototype.saveUploadFiles = function(path) {
	if (path == undefined)
		path = null;
	Packages.efw.file.FileManager.saveUploadFiles(path);
};
