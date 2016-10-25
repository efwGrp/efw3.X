package efw;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Method;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import efw.db.DatabaseManager;
import efw.file.FileManager;
import efw.format.FormatManager;
import efw.log.LogManager;
import efw.pdf.PdfManager;
import efw.properties.PropertiesManager;
import efw.script.ScriptManager;
import efw.sql.SqlManager;

/**
 * サーブレットアノテーション設定で、起動と同時にフレームワークの初期化を行う。
 * JQueryからのAjax通信をサーバーサイトJavaScriptへ転送する。
 * @author Chang Kejun
 */
@SuppressWarnings("serial")
@WebServlet(name="efwServlet",loadOnStartup=1,urlPatterns={"/efwServlet"})
public final class efwServlet extends HttpServlet {
	/**
	 * 初期化成功か否かを表すフラグ。
	 */
	private static boolean initSuccessFlag=false;
	/**
	 * サーバー部品JavaScriptファイルの格納パス、
	 * Webアプリケーションコンテキストからの相対パスで表す。
	 * <br>efw.propertiesのefw.server.folderで設定する。
     * デフォルトは「/WEB-INF/efw/server」。
	 */
    private static String serverFolder="/WEB-INF/efw/server";
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
    
    /**
     * デバッグモードを制御するフラグ。
     * <br>efw.propertiesのefw.isdebugで設定、
     * デフォルトはfalse。
     * <br>trueの場合、SqlとScriptの変更はリアルに反映する。falseの場合、SqlとScriptの変更は再起動するまで反映しない。
     */
    private static boolean isDebug=false;
    /**
     * クロスドメイン通信設定、
     * 他のサーバーのウェブページから本サイトのイベントを利用する可否を管理する。
     * デフォルトは * 全部許可。
     * * : 全部許可, null : 全部拒否, http://xxx/xxx,http://yyy/yyy : 指定サイト許可。
     */
    private static String cors="*";
    /**
     * レスポンスの文字セット定数、XMLHttpRequestのデフォルトに合わせ、「UTF-8」に固定。
     */
    private static final String RESPONSE_CHAR_SET="UTF-8";
    /**
     * システムエラー画面遷移のURL、空白は初期値。
     */
    private static String systemErrorUrl="";
    /**
     * リクエストオブジェクト。
     * スレッドローカルにリクエストオブジェクトを格納する。サーバーサイトJavascriptに利用される。
     */
    private static ThreadLocal<HttpServletRequest> request=new ThreadLocal<HttpServletRequest>();
    /**
     * リクエストオブジェクトを取得。
     * スレッドローカルに格納するリクエストオブジェクトを取得する。
     * @return　スレッドローカルに格納するリクエストオブジェクト。
     */
    public static HttpServletRequest getRequest(){
    	return efwServlet.request.get();
    }
    /**
     * サーブレットの起動と同時に、
     * LogManager、SqlManager、ScriptManagerの初期化を行う。
     * <br>初期化成功の場合、initSuccessFlagをtrueに設定する。失敗の場合、false。
     * @throws ServletException 
     */
    @SuppressWarnings({ "unchecked", "rawtypes" })
	public void init() throws ServletException {
    	try {
        	//call the orgin init function
        	super.init();
        	// begin to init efw
        	PropertiesManager.init();
            LogManager.init();
            LogManager.InitCommonDebug("PropertiesManager.init");
            LogManager.InitCommonDebug("LogManager.init");
            //efwFilter init to check login or not
            efwFilter.init();
            LogManager.InitCommonDebug("efwJspLoginFilter.init");
            
            //get attrs from properties or context
            isDebug=PropertiesManager.getBooleanProperty(PropertiesManager.EFW_ISDEBUG,isDebug);
        	LogManager.InitCommonDebug("isDebug = " + isDebug);
            cors=PropertiesManager.getProperty(PropertiesManager.EFW_CORS,cors);
        	LogManager.InitCommonDebug("cors = " + cors);
        	String propertyPath="";
        	propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_SEVER_FOLDER,serverFolder);
        	if(propertyPath.startsWith("/WEB-INF/")){propertyPath=this.getServletContext().getRealPath(propertyPath);}
        	serverFolder=propertyPath;
        	LogManager.InitCommonDebug("serverFolder = " + serverFolder);
        	propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_EVENT_FOLDER,eventFolder);
        	if(propertyPath.startsWith("/WEB-INF/")){propertyPath=this.getServletContext().getRealPath(propertyPath);}
        	eventFolder=propertyPath;
        	LogManager.InitCommonDebug("eventFolder = " + eventFolder);
        	propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_SQL_FOLDER,sqlFolder);
        	if(propertyPath.startsWith("/WEB-INF/")){propertyPath=this.getServletContext().getRealPath(propertyPath);}
        	sqlFolder=propertyPath;
        	LogManager.InitCommonDebug("sqlFolder = " + sqlFolder);
        	propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_STORAGE_FOLDER,storageFolder);
        	if(propertyPath.startsWith("/WEB-INF/")){propertyPath=this.getServletContext().getRealPath(propertyPath);}
        	storageFolder=propertyPath;
        	LogManager.InitCommonDebug("storageFolder = " + storageFolder);
        	propertyPath=PropertiesManager.getProperty(PropertiesManager.EFW_MAIL_FOLDER,mailFolder);
        	if(propertyPath.startsWith("/WEB-INF/")){propertyPath=this.getServletContext().getRealPath(propertyPath);}
        	mailFolder=propertyPath;
        	LogManager.InitCommonDebug("mailFolder = " + mailFolder);
        	systemErrorUrl=PropertiesManager.getProperty(PropertiesManager.EFW_SYSTEM_ERROR_URL,systemErrorUrl);
        	LogManager.InitCommonDebug("systemErrorUrl = " + systemErrorUrl);
        	
        	//check the define folders
        	if (!new File(serverFolder).exists())LogManager.InitErrorDebug(efwException.ServerFolderDoesNotExistException,serverFolder);//throw new efwException(efwException.ServerFolderDoesNotExistException,serverFolder);
        	if (!new File(eventFolder).exists())LogManager.InitErrorDebug(efwException.EventFolderDoesNotExistException,eventFolder);//throw new efwException(efwException.EventFolderDoesNotExistException,eventFolder);
        	if (!new File(sqlFolder).exists())LogManager.InitErrorDebug(efwException.SqlFolderIsNotExistsException,sqlFolder);//throw new efwException(efwException.SqlFolderIsNotExistsException,sqlFolder);
        	if (!new File(mailFolder).exists())LogManager.InitErrorDebug(efwException.MailFolderIsNotExistsException,mailFolder);//throw new efwException(efwException.MailFolderIsNotExistsException,mailFolder);
        	File fileStorage=new File(storageFolder);
        	if(!fileStorage.exists()){
        		try{
            		fileStorage.mkdirs();
        		}catch(SecurityException e){
        			LogManager.InitErrorDebug(efwException.StorageFolderIsNotExistsException,storageFolder);
        		}
        	}
        	//load definition from folders
    		SqlManager.init(sqlFolder,isDebug);
    		LogManager.InitCommonDebug("SqlsManager.init");
    		FileManager.init(storageFolder);
    		LogManager.InitCommonDebug("FileManager.init");
			DatabaseManager.init();
    		LogManager.InitCommonDebug("DatabaseManager.init");
    		if (PropertiesManager.getBooleanProperty(PropertiesManager.EFW_BRMS_IMPORT, false)){
    			try{
            		Class brms = Class.forName("efw.brms.BrmsManager");
        			Method method = brms.getDeclaredMethod("init");
        			method.invoke(null,(Object[])null);
            		LogManager.InitCommonDebug("BrmsManager.init");
    			}catch(Exception ex){
    				LogManager.InitErrorDebug("BrmsManager.init");
    			}
    		}
    		ScriptManager.init(serverFolder,eventFolder,isDebug);
    		LogManager.InitCommonDebug("ScriptManager.init");
    		FormatManager.init();
    		LogManager.InitCommonDebug("FormatManager.init");
    		PdfManager.init();
    		LogManager.InitCommonDebug("PdfManager.init");
    		
    		if (PropertiesManager.getBooleanProperty(PropertiesManager.EFW_MAIL_IMPORT, false)){
    			try{
            		Class brms = Class.forName("efw.mail.MailManager");
        			Method method = brms.getDeclaredMethod("init",String.class,boolean.class);
        			method.invoke(null,mailFolder,isDebug);
            		LogManager.InitCommonDebug("MailManager.init");
    			}catch(Exception ex){
    				ex.printStackTrace();
    				System.out.println(ex.getMessage());
    				LogManager.InitErrorDebug("MailManager.init");
    			}
    		}
    		
    		//init is success
    		initSuccessFlag=true;
            LogManager.InitCommonDebug("efwServlet.init");
		} catch (efwException e) {
			LogManager.InitErrorDebug(e.getMessage());
		}
    }

	/**
	 * JQueryからのAjax通信をサーバーサイトJavaScriptへ転送し、その実行結果をレスポンスする。
	 * <br>efwサーブレット が初期化失敗またはサーバーサイトJavaScript実行エラーの場合、OtherErrorMessageのエラー情報をレスポンスする。
	 * @param request JQueryがefwサーブレット へ要求したJSON内容を含む HttpServletRequest オブジェクト。
	 * @param response efwサーブレットがJQueryに返すJSON内容を含む HttpServletResponse オブジェクト 。
	 * @throws efwException IOException 
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
        response.setCharacterEncoding(RESPONSE_CHAR_SET);
        String otherError="{\"values\":[],\"actions\":{\"error\":{\"clientMessageId\":\"OtherErrorException\"}"+
        		(systemErrorUrl.equals("")?"":",\"navigate\":{\"url\":\""+systemErrorUrl+"\"}")
        		+"}";
		//--------------------------------------------------------------------
        //if init is failed, return the info instead of throw exception
		if (!efwServlet.initSuccessFlag){
			response.getWriter().print(otherError);
			return;
		}
		//cors support
		if("*".equals(cors)){
			response.setHeader("Access-Control-Allow-Origin", "*");
		}else if("null".equals(cors)||"".equals(cors)||null==cors){
			//do nothing
		}else{
			String[] corsAry=cors.split(",");
			for(int i=0;i<corsAry.length;i++){
				response.setHeader("Access-Control-Allow-Origin", corsAry[i]);
			}
		}
		//call script 
		efwServlet.request.set(request);
		try {
			response.getWriter().print(ScriptManager.doPost(request.getParameter("data")));
			LogManager.CommDebug("efwServlet.doPost");
		} catch (Exception e) {
			LogManager.ErrorDebug(e.getMessage());
			response.getWriter().print(otherError);
		}finally{
			efwServlet.request.remove();
		}
	}
}
