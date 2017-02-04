/**** efw3.X Copyright 2016 efwGrp ****/
package elFinder.taglib;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
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
public class ElFinder extends TagSupport implements DynamicAttributes {
	
	/**
	 */
	private String id="elFinder";
	private String home="";
	private boolean readonly=false;
	private String lang="";
	private String height="";
	private String width="";
	private HashMap<String, String> attrs=new HashMap<String, String>();

	/**
	 * タグを実行する。
	 */
	@Override
	public int doStartTag(){
		
		JspWriter out;
		try {
			out = pageContext.getOut();
			out.print("<link href=\"elFinder/css/elfinder.min.css\" rel=\"stylesheet\">");
			out.print("<link href=\"elFinder/css/theme.css\" rel=\"stylesheet\">");
			//out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"elFinder/js/elfinder4efw.full.js\"></script>");
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"elFinder/js/elfinder4efw.min.js\"></script>");
			if(!"".equals(lang)){
				out.print("<script type=\"text/javascript\" charset=\"UTF-8\" src=\"elFinder/js/i18n/elfinder."+lang+".js\"></script>");
			}
			out.print("<script type=\"text/javascript\" charset=\"UTF-8\">");
			out.print("var "+id+"=$(function(){$(\"#"+id+"\")"
					+ ".elfinder({"
					+ "\"url\":\"efwServlet\","
					+ "\"urlUpload\":\"uploadServlet\","
					+ "\"soundPath\":\"elFinder/sounds\","
					
					+("".equals(lang)||"en".equals(lang)?"":"lang:"+"\""+lang+"\",")
					+("".equals(height)?"":"height:"+height+",")
					+("".equals(width)?"":"width:"+width+",")
					+ "\"customData\":{"
					+ "\"home\":\""+home+"\","
					+ "\"readonly\":"+readonly+","
					+ "}"
					+ "}).elfinder(\"instance\");});");
			out.print("</script>");
			String temp="";
			for(Map.Entry<String, String> e : attrs.entrySet()) {
				temp+=e.getKey()+"=\""+e.getValue()+"\" ";
			}
			out.print("<div "+"id=\""+id+"\" "+temp+"></div>");
		} catch (IOException e) {
			e.printStackTrace();
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
		if(name.equalsIgnoreCase("id")){
			id=(String) value;
		}else if(name.equalsIgnoreCase("home")){
			home=(String) value;
		}else if(name.equalsIgnoreCase("lang")){
			lang=(String) value;
		}else if(name.equalsIgnoreCase("height")){
			height=(String) value;
		}else if(name.equalsIgnoreCase("width")){
			width=(String) value;
		}else if(name.equalsIgnoreCase("readonly")){
			if(((String) value).equalsIgnoreCase("true")){
				readonly=true;
			}
		}else{
			attrs.put(name, (String)value);
		}
	}

}
