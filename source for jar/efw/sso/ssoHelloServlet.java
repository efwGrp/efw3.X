/**** efw3.X Copyright 2019 efwGrp ****/
package efw.sso;

import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * SSO認証のため、サーバ間通信用のクラス。
 * SESSIONIDとほかの伝達情報を受け取って、TOKENIDを作成して、戻す。
 * @author Chang Kejun
 *
 */
@SuppressWarnings("serial")
@WebServlet(name="ssoHelloServlet",loadOnStartup=1,urlPatterns={"/ssoHelloServlet"})
public class ssoHelloServlet extends HttpServlet{
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException{
		//もしSSO無効であれば中断。
		if (!SsoManager.isSsoEnable()) return;
		
		//セッションIDを取得する.セッションIDのパラメータがなければ処理中断。
		String sessionid=request.getParameter("SESSIONID");
		if (sessionid==null) return;
		//パラメータからデータオブジェクトを作成する。
		HashMap<String,String> data=new HashMap<String,String>();
		Enumeration<String> e =request.getParameterNames();
		while(e.hasMoreElements()) {
			String key = (String)e.nextElement();
			data.put(key, new String(request.getParameter(key).getBytes("8859_1"),"UTF-8"));
		}
		//tokenidを作成する。
		String tokenid=SsoManager.createTokenId();
		data.put("TOKENID", tokenid);
		//有効性チェックのため、dataを保持する。
		SsoManager.put(sessionid, data);
		//tokenidを相手サーバに戻す
		response.getWriter().write(tokenid);
	}

}
