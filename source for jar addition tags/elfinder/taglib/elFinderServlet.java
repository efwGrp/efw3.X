package elfinder.taglib;

import java.io.IOException;

import javax.script.ScriptException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import efw.log.LogManager;
import efw.script.ScriptManager;
/**
 * このクラスはelFinder要のイベントを初期させるだけ。
 * @author Chang Kejun
 *
 */
@SuppressWarnings("serial")
@WebServlet(name="elFinderServlet",loadOnStartup=10,urlPatterns={"/elFinderServlet"})
public class elFinderServlet extends HttpServlet {
	/**
	 * 初期化成功か否かを表すフラグ。
	 */
	private static boolean initSuccessFlag=false;

	public void init() throws ServletException {
		if (initSuccessFlag) return;
		try {
			ScriptManager.loadResource("elfinder/resource/server/init.js");
			initSuccessFlag=true;
		} catch (ScriptException e) {
			e.printStackTrace();
			LogManager.InitErrorDebug(e.getMessage());
		} catch (IOException e) {
			e.printStackTrace();
			LogManager.InitErrorDebug(e.getMessage());
		}
		
	}

}
