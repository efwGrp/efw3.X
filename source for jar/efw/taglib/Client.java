/**** efw3.X Copyright 2016 efwGrp ****/
package efw.taglib;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.DynamicAttributes;
import javax.servlet.jsp.tagext.SimpleTagSupport;
/**
 * Clientタグを処理するクラス。
 * <efw:Client/>
 * headタグ内に追加すれば、efwの基本機能を利用できる。
 * @author Chang Kejun
 *
 */
public class Client extends SimpleTagSupport implements DynamicAttributes {
	/**
	 * efwのjsとcssのみにするかどうか
	 */
	private boolean withoutJQuery=false;	
	/**
	 * タグ処理。
	 *efwの基本機能を利用するため、複数のcssとjsを取り込むタグを作成する。
	 */
	@Override
	public void doTag() throws JspException, IOException {
		super.doTag();
		JspWriter out = this.getJspContext().getOut();
		if (!withoutJQuery){
			out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\"./efw/efw.css\">");
			out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\"./efw/jquery-ui.min.css\">");
			out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\"./efw/jquery-ui.structure.min.css\">");
			out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\"./efw/jquery-ui.theme.min.css\">");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"./efw/jquery-min.js\"></script>");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"./efw/jquery-ui.min.js\"></script>");
		}
		out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"./efw/js.cookie.min.js\"></script>");
		out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"./efw/efw.client.messages.js\"></script>");
		out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"./efw/efw.client.format.js\"></script>");
		out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"./efw/efw.client.inputbehavior.js\"></script>");
		out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"./efw/efw.client.js\"></script>");
		out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"./efw/efw.js\"></script>");
	}

	/**
	 * 動的パラメータを取得する。
	 * 取得するパラメータをREQUEST_SCOPEに設定する。
	 */
	@Override
	public void setDynamicAttribute(String uri, String name, Object value)
			throws JspException {
		if(name.equalsIgnoreCase("withoutjquery")){
			if (((String)value).equalsIgnoreCase("true")){
				withoutJQuery=true;
			}
		}else{
			this.getJspContext().setAttribute(name, value,PageContext.REQUEST_SCOPE);
		}
		
	}
}
