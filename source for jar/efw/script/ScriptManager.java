/**** efw3.X Copyright 2016 efwGrp ****/
package efw.script;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import efw.efwException;

/**
 * サーバーサイトJavaScriptの管理と実行を行うクラス。
 * @author Chang Kejun
 *
 */
public final class ScriptManager {
	/**
	 * イベントJavaScriptファイルの格納パス。
	 * サーブレットから渡される。
	 */
    private static String eventFolder;
    /**
     * デバッグモードを制御するフラグ。
	 * サーブレットから渡される。
     */
    private static boolean isDebug;
    /**
     * サーバーサイトJavaScriptファイルの文字セット定数。
     * 「UTF-8」に固定。
     */
    private static final String SCRIPT_CHAR_SET="UTF-8";
    /**
     * スクリプトエンジンに渡すイベントJavaScriptファイルの格納パスのキー。
     * 「_eventfolder」に固定。
     */
    private static final String KEY_EVENTFOLDER="_eventfolder";
    /**
     * スクリプトエンジンに渡すデバッグモード制御フラグのキー。
     * 「_isdebug」に固定。
     */
    private static final String KEY_ISDEBUG="_isdebug";
    /**
     * スクリプトエンジンに渡すスクリプトエンジンのキー。
     * 「_engine」に固定。
     */
    private static final String KEY_ENGINE="_engine";

    private static final ScriptEngine _se=(new ScriptEngineManager()).getEngineByName("JavaScript");
    
    public static final ScriptEngine se(){
    	return _se;
    }
	/**
	 * サーブレットから設定情報を受け取り、スクリプトエンジン管理オブジェクトを初期化する。
	 * @param eventFolder イベントJavaScriptファイルの格納パス。
	 * @param isDebug　デバッグモード制御フラグ。
	 * @throws ScriptException 
	 * @throws IOException 
	 */
	public static synchronized void init(String eventFolder,boolean isDebug)throws efwException {
		ScriptManager.eventFolder=eventFolder;
		ScriptManager.isDebug=isDebug;

		se().put(KEY_EVENTFOLDER, ScriptManager.eventFolder);
		se().put(KEY_ISDEBUG, ScriptManager.isDebug);
		se().put(KEY_ENGINE, ScriptManager.se());
		try {
			se().eval(loadResource("efw/resource/server/efw.js"));
		} catch (ScriptException e) {
			e.printStackTrace();
			throw new efwException(efwException.ScriptInitFailedException);
		} catch (IOException e) {
			e.printStackTrace();
			throw new efwException(efwException.ScriptInitFailedException);
		}
	}
	/**
	 * リクエストをサーバーサイトJavaScriptに転送する。
	 * もしスレッドにスクリプトエンジンが付けられていないなら、スクリプトエンジンを作成し、共通とするefw.server.jsを実行する。
	 * @param request JQueryがefwサーブレット へ要求したJSON内容を含む HttpServletRequest オブジェクト。
	 * @return 実行結果のJSON文字列を返す。
	 * @throws NoSuchMethodException 
	 * @throws ScriptException スクリプトエラー。
	 * @throws IOException ファイル操作エラー。
	 */
	public static String doPost(String req) throws Exception {
		Invocable invocable = (Invocable) se();
		return (String)invocable.invokeFunction("doPost", req);
	}

	/**
	 * 指定ファイル名のサーバーサイトJavaScriptファイルをロードする。
	 * JDK1.6 1.7のMozilla Rhinoエンジンに「load」関数を実装するため。
	 * @param fileName　サーバーサイトJavaScriptファイルの名称。
	 * @throws ScriptException スクリプトエラー。
	 * @throws IOException ファイル操作エラー。
	 */
	public static String loadFile(String fileName) throws ScriptException, IOException  {
		BufferedReader rd=new BufferedReader(new InputStreamReader(
				new FileInputStream(fileName),SCRIPT_CHAR_SET));
		StringBuffer buffer=new StringBuffer();
		String line=null;
		while((line=rd.readLine())!=null){
			buffer.append(line);
			buffer.append("\n");
		}
		rd.close();
		return buffer.toString();
	}
	/**
	 * jarに含まれるjsをロードする。
	 * @param fileName
	 * @throws ScriptException
	 * @throws IOException
	 */
	public static String loadResource(String fileName) throws ScriptException, IOException  {
		BufferedReader rd=new BufferedReader(new InputStreamReader(
				Thread.currentThread().getContextClassLoader().getResourceAsStream(fileName),SCRIPT_CHAR_SET));
		StringBuffer buffer=new StringBuffer();
		String line=null;
		while((line=rd.readLine())!=null){
			buffer.append(line);
			buffer.append("\n");
		}
		rd.close();
		return buffer.toString();
	}
	  
}
