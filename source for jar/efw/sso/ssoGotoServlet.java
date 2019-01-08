/**** efw3.X Copyright 2019 efwGrp ****/
package efw.sso;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * SSO認証のため、WEB画面間通信用のクラス。
 * SESSIONID TOKENID URLを受け取って、SESSIONID TOKENIDで認証用情報と照合し、
 * ＯＫであれば、伝達情報をセッションに設定してURLに遷移する。
 * @author Chang Kejun
 *
 */
@SuppressWarnings("serial")
@WebServlet(name="ssoGotoServlet",loadOnStartup=1,urlPatterns={"/ssoGotoServlet"})
public class ssoGotoServlet extends HttpServlet{
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException{
		//もしSSO無効であれば中断。
		if (!SsoManager.isSsoEnable()) return;
		//認証用キーと遷移URLを受け取る。
		String sessionid=request.getParameter("SESSIONID");
		String tokenid=request.getParameter("TOKENID");
		String url=request.getParameter("URL");
		//情報不完全であれば処理中断。
		if (sessionid==null) return;
		if (tokenid==null) return;
		if (url==null) return;
		//格納している認証用情報に該当セッションIDの情報がなければ中断。
		HashMap<String,String> data=SsoManager.get(sessionid);
		if (data==null) return;
		//TOKENIDの判断
		if (tokenid.equals(data.get("TOKENID"))){
			//伝達情報をセッションに格納する。
			SsoManager.remove(sessionid);
			HttpSession session =request.getSession();
			for (String key : data.keySet()) {
				if ("SESSIONID".equals(key)) continue;
				if ("TOKENID".equals(key)) continue;
				if ("URL".equals(key)) continue;
				
				session.setAttribute(key, data.get(key));
			}
			//画面遷移する。
			response.sendRedirect(url);
		}
	}
}
