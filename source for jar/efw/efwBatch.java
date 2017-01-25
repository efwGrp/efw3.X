/**** efw3.X Copyright 2016 efwGrp ****/
package efw;

import java.io.File;
import java.lang.reflect.Method;

import efw.db.DatabaseManager;
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
			DatabaseManager.initFromBatch();
    		LogManager.InitCommonDebug("DatabaseManager.initFromBatch");
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
    		
    		//init is success
            LogManager.InitCommonDebug("efwBatch.init");
    	} catch (Exception e) {
			LogManager.InitErrorDebug(e.getMessage());
			return;
		}
        //call script 
		try {
			String ret=ScriptManager.doPost(args[0]);
			System.out.println(ret);
		} catch (Exception e) {
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
}


