/**** efw3.X Copyright 2016 efwGrp ****/
package efw.taglib;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.SimpleTagSupport;
/**
 * Clientタグを処理するクラス。
 * <efw:Client/>
 * headタグ内に追加すれば、efwの基本機能を利用できる。
 * @author Chang Kejun
 *
 */
public class Client extends SimpleTagSupport {
	/**
	 * タグ処理。
	 *efwの基本機能を利用するため、複数のcssとjsを取り込むタグを作成する。
	 */
	@Override
	public void doTag() throws JspException, IOException {
		super.doTag();
		JspWriter out = this.getJspContext().getOut();
		out.print("<link href=\"./efw/efw.css\" rel=\"stylesheet\">");
		out.print("<link href=\"./efw/jquery-ui.min.css\" rel=\"stylesheet\">");
		out.print("<link href=\"./efw/jquery-ui.structure.min.css\" rel=\"stylesheet\">");
		out.print("<link href=\"./efw/jquery-ui.theme.min.css\" rel=\"stylesheet\">");
		out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"./efw/jquery-min.js\"></script>");
		out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"./efw/jquery-ui.min.js\"></script>");
		out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"./efw/js.cookie.min.js\"></script>");
		out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"./efw/efw.client.messages.js\"></script>");
		out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"./efw/efw.client.format.js\"></script>");
		out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"./efw/efw.client.inputbehavior.js\"></script>");
		out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"./efw/efw.client.js\"></script>");
		out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"./efw/efw.js\"></script>");
	}
}
