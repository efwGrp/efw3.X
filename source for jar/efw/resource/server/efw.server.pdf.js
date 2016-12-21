/**** efw3.X Copyright 2016 efwGrp ****/
/**
 * The class to operate pdf files.
 * 
 * @author Chang Kejun
 */
function EfwServerPdf() {
};
/**
 * The function to create a pdf from a relative url to the web application,<br> 
 * and save it as the relative path to the storage folder.
 * @param {String} url: required<br>
 * @param {String} savePath: required<br>
 * @returns {EfwServerPdf}
 */
EfwServerPdf.prototype.create = function(url, savePath) {
	Packages.efw.pdf.PdfManager.url2Pdf(url, savePath);
};
/**
 * The function to merge all pdfs in a relative folder to the storage folder,<br> 
 * and save it as the relative path to the storage folder.
 * @param {String} folder: required<br>
 * @param {String} savePath: required<br>
 * @returns {EfwServerPdf}
 */
EfwServerPdf.prototype.merge = function(folder, savePath) {
	Packages.efw.pdf.PdfManager.merge(folder, savePath);
};