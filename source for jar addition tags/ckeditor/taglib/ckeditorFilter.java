/**** efw3.X Copyright 2016 efwGrp ****/
package ckeditor.taglib;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * クライアントリソースをjarに格納するためのフィルタ
 * @author Chang Kejun
 *
 */
@WebFilter(filterName="ckeditorFilter", urlPatterns={"*.html","*.css","*.js","*.jpg","*.png","*.gif"})
public class ckeditorFilter implements Filter {
	/**
	 * 一周間キャッシュするため
	 */
	private static final long DEFAULT_EXPIRE_TIME = 604800000L; // ..ms = 1 week.
	/**
	 * クライアントから依頼されたリソースはjarにあるかどうかチェックする。
	 * jarにあればjarから出力する。jarになければtomcatに任せる。
	 * jarから出力する場合、一周間キャッシュする。
	 */
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		String filename=((HttpServletRequest) request).getServletPath();
		if (filename.indexOf("/ckeditor/")!=0){
			chain.doFilter(request, response);
			return;
		}else{
			filename=filename.substring(10);
		}
		String ex=getExtension(filename);
		String resourcePath=null;
		if ("html".equals(ex)){
			resourcePath="ckeditor/resource/client/"+filename;
			response.setContentType("text/html"); 
		}else if ("css".equals(ex)){
			resourcePath="ckeditor/resource/client/"+filename;
			response.setContentType("text/css"); 
		}else if ("js".equals(ex)){
			resourcePath="ckeditor/resource/client/"+filename;
			response.setContentType("text/javascript"); 
		}else if("jpg".equals(ex)){
			resourcePath="ckeditor/resource/client/"+filename;
			response.setContentType("image/jpeg"); 
		}else if("png".equals(ex)){
			resourcePath="ckeditor/resource/client/"+filename;
			response.setContentType("image/png"); 
		}else if("gif".equals(ex)){
			resourcePath="ckeditor/resource/client/"+filename;
			response.setContentType("image/gif"); 
		}
		if (resourcePath==null){
			chain.doFilter(request, response);
		}else{
		    ServletOutputStream out = response.getOutputStream();
		    InputStream in = Thread.currentThread().getContextClassLoader().getResourceAsStream(resourcePath);
		    if (in==null){
		    	chain.doFilter(request, response);
		    }else{
				long expires = System.currentTimeMillis() + DEFAULT_EXPIRE_TIME;
				((HttpServletResponse) response).setDateHeader("Expires", expires); // Postpone cache with 1 week.
			    byte [] buffer = new byte[1024];
			    while(true) {
			        int len = in.read(buffer);
			        if(len < 0) {
			            break;
			        }
			        out.write(buffer, 0, len);
			    }
			    in.close();
		    }
		}
	}
	/**
	 * 拡張子を取得する。
	 * @param fileName
	 * @return
	 */
	private String getExtension(String fileName) {
	    if (fileName == null) {
	        return null;
	    }
	    int lastDotPosition = fileName.lastIndexOf(".");// 最後の『 . 』の位置を取得します。
	    if (lastDotPosition != -1) {// 『 . 』が存在する場合は、『 . 』以降を返します。
	        return fileName.substring(lastDotPosition + 1);
	    }
	    return null;
	}

	public void init(FilterConfig arg0) throws ServletException {}
	public void destroy() {}
}
