/**
 * The class to operate pdf files.
 * 
 * @author Chang Kejun
 */
function EfwServerPdf() {
};
/**
 * The function to change a relative url to pdf file in the relative path.
 * @param {String} url: the relative url to the application base url.
 * @param {String} pdfPath: the relative path to the storage path.
 */
EfwServerPdf.prototype.url2Pdf = function(url, pdfPath) {
	Packages.efw.pdf.PdfManager.url2Pdf(url, pdfPath);
};
/**
 * The function to merge all pdfs in a folder to one pdf.
 * @param {String} sourcePdfFolder: the relative folder path to the storage path.
 * @param {String} targetPdfPath: the relative file path to the storage path.
 */
EfwServerPdf.prototype.merge = function(sourcePdfFolder, targetPdfPath) {
	Packages.efw.pdf.PdfManager.merge(sourcePdfFolder, targetPdfPath);
};
