/**** efw3.X Copyright 2016 efwGrp ****/
package signature.taglib;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.DynamicAttributes;
import javax.servlet.jsp.tagext.TagSupport;
/**
 * Signatureタグを処理するクラス。
 * <efw:Signature home="" readonly="" lang="" height="" width=""/>
 * @author Chang Kejun
 *
 */
@SuppressWarnings("serial")
public class Signature extends TagSupport implements DynamicAttributes {
	
	/**
	 */
	private String id="signature";
	private String height="200";
	private String width="400";
	private HashMap<String, String> attrs=new HashMap<String, String>();

	/**
	 * タグを実行する。
	 */
	@Override
	public int doStartTag(){
		if (this.getId()!=null){
			id=this.getId();
		}
		JspWriter out;
		try {
			out = pageContext.getOut();
			out.print("<link type=\"text/css\" rel=\"stylesheet\" href=\"signature/jquery.signature4efw.css\">");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"signature/jquery.signature4efw.min.js\"></script>");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"signature/jquery.ui.touch-punch.min.js\"></script>");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\">");
			out.print("var "+id+";$(function(){"+id+"=$(\"#div_"+id+"\").signature({"
					+ "change:function(){$(\"#"+id+"\").val("+id+".signature(\"toSVG\"));}"
					+ "});$(\"#"+id+"\").val(\"\");});");
			out.print("</script>");
			String temp="";
			for(Map.Entry<String, String> e : attrs.entrySet()) {
				temp+=e.getKey()+"=\""+e.getValue()+"\" ";
			}
			out.print("<div "+"id=\"div_"+id+"\" style=\"width:"+width+"px;height:"+height+"px\" "+temp+" >"
					+ "</div>"
					+ "<a class=\"cls-signature\" href=\"#\" style=\"position:relative;left:-24px;top:-8px\">"
					+ "<img src=\"signature/reset.png\" onclick=\""+id+".signature('clear');$('#"+id+"').val('');\">"
					+ "<input type=\"hidden\" id=\""+id+"\" \">"
					+ "</a>"
					);
		} catch (IOException e) {
			e.printStackTrace();
		}
		//初期値を再設定する。
		id="signature";
		height="200";
		width="400";
		attrs=new HashMap<String, String>();
		return SKIP_BODY;
	}

	/**
	 * 動的パラメータを取得する。
	 * 取得するパラメータをREQUEST_SCOPEに設定する。
	 */
	@Override
	public void setDynamicAttribute(String uri, String name, Object value)
			throws JspException {
		if(name.equalsIgnoreCase("id")){
			id=(String) value;
		}else if(name.equalsIgnoreCase("height")){
			height=(String) value;
		}else if(name.equalsIgnoreCase("width")){
			width=(String) value;
		}else{
			attrs.put(name, (String)value);
		}
	}

}
