package efw.pdf;

import java.io.File;
import java.io.IOException;
import efw.file.FileManager;
import efw.properties.PropertiesManager;
/**
 * PDFファイル作成などを管理するクラス。
 * @author Chang Kejun
 */
public class PdfManager {
    /**
     * webからpdfに変換するツールのパス、初期値はCドライブのインストールパス
     */
	private static String wkhtmltopdf="C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe";
	/**
	 * pdfファイル変換ツールのパス、初期値はCドライブのインストールパス
	 */
	private static String pdftk="C:/Program Files/PDFtk Server/bin/pdftk.exe";
	/**
	 * webからpdf変換するため、WEBサーバのローカルからアプリを接続する時のURL
	 */
	private static String baseurl="http://localhost:8080/efw/";
	
    /**
     * PDF変換に関わる設定情報を取得する
     */
	public final static void init(){
		wkhtmltopdf=PropertiesManager.getProperty("efw.pdf.wkhtmltopdf",wkhtmltopdf);
		pdftk=PropertiesManager.getProperty("efw.pdf.pdftk",pdftk);
		baseurl=PropertiesManager.getProperty("efw.pdf.baseurl", baseurl);
	}
	/**
	 * URLからPDFを作成する
	 * @param url 相対パスのURL 相対対象はefwアプリのパス
	 * @param pdfpath 作成するpdfファイルの相対パス。相対対象はstorageフォルダ
	 * @throws IOException 
	 * @throws InterruptedException 
	 */
	public final static void url2Pdf(String url,String pdfpath) throws IOException, InterruptedException{
		String fullUrl=baseurl+url;
		Process p =Runtime.getRuntime().exec(
			"\""+ wkhtmltopdf +"\""+
			" "+fullUrl+" "+
			"\""+FileManager.getStorageFolder()+"/"+pdfpath+"\" "
		);
		p.waitFor();
		p.destroy();
	}
	/**
	 * 指定フォルダに存在するPDFファイルを1つにマージする
	 * @param sourcePdfFolder もとPDFファイルの格納フォルダ
	 * @param targetPdfPath　マージ後のPDFファイル相対パス。相対対象はstorageフォルダ
	 * @throws IOException
	 * @throws InterruptedException
	 */
	public final static void merge(String sourcePdfFolder,String targetPdfPath) throws IOException, InterruptedException{
		String fromfolder=FileManager.getStorageFolder();
		if(!"".equals(sourcePdfFolder))fromfolder=fromfolder+"/"+sourcePdfFolder;
		fromfolder=fromfolder+"/*.pdf";
		File[] files=efw.file.FileManager.getListByExt(sourcePdfFolder,"pdf");
		Process p =Runtime.getRuntime().exec(
			"\""+ pdftk +"\" "+
			"\""+fromfolder+"\" "+
			"output \""+FileManager.getStorageFolder()+"/"+targetPdfPath+"\" "
		);
		p.waitFor();
		p.destroy();
		
		for(int i=0;i<files.length;i++)files[i].delete();
	}
}
