/**** efw3.X Copyright 2016 efwGrp ****/
package efw;

import java.io.File;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import efw.event.RemoteEventManager;
import efw.file.FileManager;
import efw.format.FormatManager;
import efw.log.LogManager;
import efw.pdf.PdfManager;
import efw.properties.PropertiesManager;
import efw.script.ScriptManager;
import efw.sql.SqlManager;

public class efwBatch {
	/**
	 * webアプリのフォルダ。
	 * ほかのフォルダの相対基準パス。
	 */
	private static final String WEBHOME="WEBHOME";
	
	private static final String PROPERTIES="PROPERTIES";
	/**
	 * イベントJavaScriptファイルの格納パス、
	 * Webアプリケーションコンテキストからの相対パスで表す。
	 * <br>efw.propertiesのefw.event.folderで設定する。
     * デフォルトは「/WEB-INF/efw/event」。
	 */
    private static String eventFolder="/WEB-INF/efw/event";
    /**
     * Sql外部化XMLファイルの格納パス、
     * Webアプリケーションコンテキストからの相対パスで表す。
     * <br>efw.propertiesのefw.sql.folderで設定、
     * デフォルトは「/WEB-INF/efw/sql」。
     */
    private static String sqlFolder="/WEB-INF/efw/sql";
    /**
     * ファイルの格納パス、
     * 絶対パスで表す。
     * <br>efw.propertiesのefw.storage.folderで設定、
     * デフォルトは「/storage」。
     */
	private static String storageFolder="/WEB-INF/efw/storage";
	/**
     * メールテンプレートの格納パス、
     * Webアプリケーションコンテキストからの相対パスで表す。
     * <br>efw.propertiesのefw.mail.folderで設定、
     * デフォルトは「/WEB-INF/efw/mail」。
     */
	private static String mailFolder="/WEB-INF/efw/mail";

    @SuppressWarnings({ "rawtypes", "unchecked" })
	public static void main(String args[]){
    	try {
        	// begin to init efw
        	PropertiesManager.initBatch(System.getenv(PROPERTIES));
            LogManager.init();
            LogManager.InitCommonDebug("PropertiesManager.init");
            LogManager.InitCommonDebug("LogManager.init");
        	
            String webHome=System.getenv(WEBHOME);
            String propertyPath="";
        	propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_EVENT_FOLDER,eventFolder);
        	if(propertyPath.startsWith("/WEB-INF/")){propertyPath=webHome+"/"+propertyPath;}
        	eventFolder=(new File(propertyPath)).getAbsolutePath();
        	LogManager.InitCommonDebug("eventFolder = " + eventFolder);
        	propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_SQL_FOLDER,sqlFolder);
        	if(propertyPath.startsWith("/WEB-INF/")){propertyPath=webHome+"/"+propertyPath;}
        	sqlFolder=(new File(propertyPath)).getAbsolutePath();
        	LogManager.InitCommonDebug("sqlFolder = " + sqlFolder);
        	propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_STORAGE_FOLDER,storageFolder);
        	if(propertyPath.startsWith("/WEB-INF/")){propertyPath=webHome+"/"+propertyPath;}
        	storageFolder=(new File(propertyPath)).getAbsolutePath();
        	LogManager.InitCommonDebug("storageFolder = " + storageFolder);
        	propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_MAIL_FOLDER,mailFolder);
        	if(propertyPath.startsWith("/WEB-INF/")){propertyPath=webHome+"/"+propertyPath;}
        	mailFolder=(new File(propertyPath)).getAbsolutePath();
        	LogManager.InitCommonDebug("mailFolder = " + mailFolder);
        	//check the define folders
        	if (!new File(eventFolder).exists())throw new efwException(efwException.EventFolderDoesNotExistException,eventFolder);
        	if (!new File(sqlFolder).exists())throw new efwException(efwException.SqlFolderIsNotExistsException,sqlFolder);
        	File fileStorage=new File(storageFolder);
        	if(!fileStorage.exists()){
        		try{
            		fileStorage.mkdirs();
        		}catch(SecurityException e){
        			throw new efwException(efwException.StorageFolderIsNotExistsException,storageFolder);
        		}
        	}
        	//load definition from folders
    		SqlManager.init(sqlFolder,false);
    		LogManager.InitCommonDebug("SqlsManager.init");
    		FileManager.init(storageFolder);
    		LogManager.InitCommonDebug("FileManager.init");
    		
    		try{
        		Class db = Class.forName("efw.db.DatabaseManager");
    			Method method = db.getDeclaredMethod("initFromBatch");
    			method.invoke(null);
        		LogManager.InitCommonDebug("DatabaseManager.init");
			}catch(Exception ex){
				LogManager.InitErrorDebug("DatabaseManager.init");
				//その他の場合、エラー出力されるので、大丈夫。
			}
    		
    		try{
				//Besure jar is existed before calling MailManager, or it is error without exception in jar
				Class.forName("javax.mail.Session");
        		Class mail = Class.forName("efw.mail.MailManager");
    			Method method = mail.getDeclaredMethod("initFromBatch",String.class);
    			method.invoke(null,mailFolder);
        		LogManager.InitCommonDebug("MailManager.init");
			} catch (ClassNotFoundException e) {
				LogManager.InitErrorDebug("MailManager.init");
				e.printStackTrace();//javamail.jarもし存在しないとき、エラーメッセージが必要。
			}catch(Exception ex){
				LogManager.InitErrorDebug("MailManager.init");
				//その他の場合、エラー出力されるので、大丈夫。
			}
    		
    		if (PropertiesManager.getBooleanProperty(PropertiesManager.EFW_BRMS_IMPORT, false)){
	    		try{
	        		Class brms = Class.forName("efw.brms.BrmsManager");
	    			Method method = brms.getDeclaredMethod("initFromBatch", (Class[])null);
	    			method.invoke(null,(Object[])null);
	        		LogManager.InitCommonDebug("BrmsManager.initFromBatch");
	    		}catch(Exception ex){
	    			LogManager.InitErrorDebug("BrmsManager.initFromBatch");
	    		}
    		}
            ScriptManager.init(eventFolder,false);
    		LogManager.InitCommonDebug("ScriptManager.init");
    		FormatManager.init();
    		LogManager.InitCommonDebug("FormatManager.init");
    		PdfManager.init();
    		LogManager.InitCommonDebug("PdfManager.init");
    		RemoteEventManager.init();
    		LogManager.InitCommonDebug("RemoteEventManager.init");
    		
    		//init is success
            LogManager.InitCommonDebug("efwBatch.init");

            //call script 
            String jsonString=ScriptManager.doBatch(args[0]);
		
		    //戻り値をjsonに変換
		    try{
			    ScriptEngine engine=(new ScriptEngineManager()).getEngineByName("JavaScript");
			    Object obj = engine.eval(String.format("(%s)", jsonString));
			    Map<String, Object> map = jsonToMap(obj, engine.getClass().getName().equals("com.sun.script.javascript.RhinoScriptEngine"));
			    if (map.containsKey("errorlevel")){//batch objectの戻り値の場合
			    	int errorlevel=(new Integer(map.get("errorlevel").toString())).intValue();
					Object[] logs=((Map)map.get("logs")).values().toArray();
			    	for(int i=0;i<logs.length;i++){
			    		String log=(String)logs[i];
			    		LogManager.log(log);
			    	}
					Object[] echos=((Map)map.get("echos")).values().toArray();
			    	for(int i=0;i<echos.length;i++){
			    		String echo=(String)echos[i];
			    		System.out.println(echo);
			    	}
			    	if(errorlevel>0){
			    		System.exit(errorlevel);
			    	}
			    }else{//ほかの任意戻り値の場合
				    System.out.println(jsonString);
			    }
		    }catch(Exception e){//処理エラーの場合、
			    System.out.println(jsonString);
		    }
				
		} catch (Exception e) {
			e.printStackTrace();//接続エラー
			LogManager.ErrorDebug(e.getMessage());
		}finally{
			try{
				if (PropertiesManager.getBooleanProperty(PropertiesManager.EFW_BRMS_IMPORT, false)){
		    		Class brms = Class.forName("efw.brms.BrmsManager");
					Method destroyFromBatch = brms.getDeclaredMethod("destroyFromBatch", (Class[])null);
					destroyFromBatch.invoke(null,(Object[])null);
				}
			}catch(Exception e){}
		}
	}
    
	@SuppressWarnings("rawtypes")
	private static Map<String, Object> jsonToMap(Object obj, boolean rhino)
			throws Exception {
		// Nashorn の場合は isArray で obj が配列かどうか判断できますが、特に何もしなくても配列番号をキーにして値を取得し
		// Map に格納できるので、ここでは無視しています。
		// Rhino だとインデックスを文字列として指定した場合に値が返ってこないようなので、仕方なく処理を切り分けました。
		// 実際は HashMap なんか使わずに自分で定義したクラス（配列はそのオブジェクトの List
		// プロパティ）にマップすることになると思うので、動作サンプルとしてはこんなもんでよろしいかと。
		boolean array = rhino ? Class.forName(
				"sun.org.mozilla.javascript.internal.NativeArray").isInstance(
				obj) : false;
		Class scriptObjectClass = Class
				.forName(rhino ? "sun.org.mozilla.javascript.internal.Scriptable"
						: "jdk.nashorn.api.scripting.ScriptObjectMirror");
		// キーセットを取得
		Object[] keys = rhino ? (Object[]) obj.getClass().getMethod("getIds")
				.invoke(obj) : ((java.util.Set) obj.getClass()
				.getMethod("keySet").invoke(obj)).toArray();
		// get メソッドを取得
		Method method_get = array ? obj.getClass().getMethod("get", int.class,
				scriptObjectClass)
				: (rhino ? obj.getClass().getMethod("get",
						Class.forName("java.lang.String"), scriptObjectClass)
						: obj.getClass().getMethod("get",
								Class.forName("java.lang.Object")));
		Map<String, Object> map = new HashMap<String, Object>();
		for (Object key : keys) {
			Object val = array ? method_get.invoke(obj, (Integer) key, null)
					: (rhino ? method_get.invoke(obj, key.toString(), null)
							: method_get.invoke(obj, key));
			if (scriptObjectClass.isInstance(val)) {
				map.put(key.toString(), jsonToMap(val, rhino));
			} else {
				map.put(key.toString(), val.toString()); // サンプルなので、ここでは単純に
															// toString()
															// してますが、実際は val
															// の型を有効に活用した方が良いでしょう。
			}
		}
		return map;
	}
}


