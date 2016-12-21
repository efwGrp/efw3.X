/**** efw3.X Copyright 2016 efwGrp ****/
package efw.excel;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map.Entry;

import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.WorkbookFactory;

import efw.file.FileManager;
/**
 * Excelファイルを取り扱うクラス。
 */
public final class ExcelManager {
	/**
     * Excelオブジェクト。
     * スレッドローカルにExcelオブジェクトを格納する。サーバーサイトJavascriptの処理後、必ず閉じるため。
	 */
	private static ThreadLocal<HashMap<String,Excel>> excel=new ThreadLocal<HashMap<String,Excel>>();
	/**
	 * 1つExcelを開く。
	 * @param path Excelのパス。
	 * @return Excelのオブジェクト。
	 * @throws EncryptedDocumentException
	 * @throws InvalidFormatException
	 * @throws IOException
	 */
	public static Excel open(String path) throws Exception{
		if(ExcelManager.excel.get()==null)
		ExcelManager.excel.set(new HashMap<String,Excel>());
		try{
			Excel excel=new Excel(path, WorkbookFactory.create(FileManager.get(path)));
			ExcelManager.excel.get().put(path, excel);
			return excel;
		}catch(Exception e){
	        e.printStackTrace();
			throw e;
		}
	}
	/**
	 * 該当スレッドに、開いたExcelをすべて閉じる。
	 * @throws IOException
	 */
	public static void closeAll(){
		if(ExcelManager.excel.get()==null)
			ExcelManager.excel.set(new HashMap<String,Excel>());

		HashMap<String,Excel> map=ExcelManager.excel.get();
		for(Entry<String, Excel> ex : map.entrySet()) {
			Excel excel=ex.getValue();
			try{
				excel.close();
			}catch(Exception e){
				e.printStackTrace();
			}
		}
		ExcelManager.excel.remove();
	}
}
