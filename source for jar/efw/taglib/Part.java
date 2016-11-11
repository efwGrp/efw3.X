package efw.taglib;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.DynamicAttributes;
import javax.servlet.jsp.tagext.TagSupport;
/**
 * Partタグを処理するクラス。
 * <efw:Part path="myPage.jsp" param1="" param2=""/>
 * bodyタグに追加して、myPage.jspの出力をIncludeする。
 * @author Chang Kejun
 *
 */
@SuppressWarnings("serial")
public class Part extends TagSupport implements DynamicAttributes {
	
	/**
	 * includeページの相対パス。
	 */
	private String path;

	/**
	 * タグを実行する。
	 */
	@Override
	public int doStartTag() throws JspException {
		
		try {
			pageContext.include(path);
		} catch (ServletException e1) {
			e1.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		return SKIP_BODY;
	}

	/**
	 * 動的パラメータを取得する。
	 * 取得するパラメータをREQUEST_SCOPEに設定する。
	 */
	@Override
	public void setDynamicAttribute(String uri, String name, Object value)
			throws JspException {
		if(name.equalsIgnoreCase("path")){
			path=(String) value;
		}else{
			pageContext.setAttribute(name, value,PageContext.REQUEST_SCOPE);
		}
	}

}
