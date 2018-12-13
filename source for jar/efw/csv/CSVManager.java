package efw.csv;

import java.util.HashMap;
import java.util.Map.Entry;
import java.io.IOException;
import java.io.PrintWriter;
import efw.file.FileManager;

public final class CSVManager {
	/**
     * Writterオブジェクト。
     * スレッドローカルにWriterオブジェクトを格納する。サーバーサイトJavascriptの処理後、必ず閉じるため。
	 */
	private static ThreadLocal<HashMap<String,PrintWriter>> writter=new ThreadLocal<HashMap<String,PrintWriter>>();
	/**
	 * 1つExcelを開く。
	 * @param path CSVのパス。
	 * @return Writterのオブジェクト。
	 */
	public static PrintWriter open(String path,String encoding) throws Exception{
		if(CSVManager.writter.get()==null)
			CSVManager.writter.set(new HashMap<String,PrintWriter>());
		try{
			PrintWriter writter = new java.io.PrintWriter(
					new java.io.BufferedWriter(
						new java.io.OutputStreamWriter(
							new java.io.FileOutputStream(FileManager.get(path),true),
							encoding)));
			CSVManager.writter.get().put(path, writter);
			return writter;
		}catch(Exception e){
	        e.printStackTrace();
			throw e;
		}
	}
	/**
	 * 該当スレッドに、開いたWritterをすべて閉じる。
	 * @throws IOException
	 */
	public static void closeAll(){
		if(CSVManager.writter.get()==null) return;

		HashMap<String,PrintWriter> map=CSVManager.writter.get();
		for(Entry<String, PrintWriter> ex : map.entrySet()) {
			PrintWriter writter=ex.getValue();
			try{
				writter.close();
			}catch(Exception e){
				e.printStackTrace();
			}
		}
		CSVManager.writter.remove();
	}

}
