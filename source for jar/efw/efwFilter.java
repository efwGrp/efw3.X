package efw;

import java.io.IOException;
import java.util.regex.Pattern;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import efw.properties.PropertiesManager;
/**
 * efwFilterから初期化される。
 * JSPのログイン要否をチェックする。
 * @author Chang Kejun
 *
 */
@WebFilter(filterName="efwFilter", urlPatterns="*.jsp")
public class efwFilter implements Filter {
	/**
	 * ログインチェック要否のフラグ。
	 */
	private static boolean loginCheck =false;
	/**
	 * ログインチェック対象のセッションキー。
	 */
	private static String loginKey ="USER_ID";
	/**
	 * ログイン画面のURL。
	 */
	private static String loginUrl ="login.jsp";
	/**
	 * エラー画面のURL。
	 */
	private static String systemErrorUrl ="error.jsp";
	/**
	 * ログインチェック対象外画面のURLパターンの文字列。
	 */
	private static String outOfloginUrlPatternString="";
	/**
	 * ログインチェック対象外画面のURLパターン。
	 */
	private static Pattern loginUrlPattern =null;
	/**
	 * ログイン画面のURLパターン。
	 */
	private static Pattern outOfloginUrlPattern =null;
	/**
	 * エラー画面のURLパターン。
	 */
	private static Pattern systemErrorUrlPattern =null;
	/**
	 * フィルタ実行関数。
	 */
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		if(loginCheck){
			String strRequestURI = ((HttpServletRequest) request).getRequestURI();
			Object loginCheckValue=((HttpServletRequest) request).getSession().getAttribute(loginKey);
			if(loginCheckValue==null || loginCheckValue.equals("")){//ログインしていない
				if(outOfloginUrlPattern.matcher(strRequestURI).find()||
						loginUrlPattern.matcher(strRequestURI).find()||
						systemErrorUrlPattern.matcher(strRequestURI).find()){
					chain.doFilter(request, response);
				}else{
			        ((HttpServletResponse)response).sendRedirect(loginUrl);
				}
			}else{
				chain.doFilter(request, response);
			}
		}else{
			chain.doFilter(request, response);
		}
	}
	/**
	 * フィルタ初期化の代わりに、efwServletから初期化するための関数。
	 * @throws efwException
	 */
	public static synchronized void init()throws efwException{
		loginCheck=PropertiesManager.getBooleanProperty(PropertiesManager.EFW_LOGIN_CHECK, loginCheck);
		loginKey=PropertiesManager.getProperty(PropertiesManager.EFW_LOGIN_KEY, loginKey);
		loginUrl=PropertiesManager.getProperty(PropertiesManager.EFW_LOGIN_URL, loginUrl);
		systemErrorUrl=PropertiesManager.getProperty(PropertiesManager.EFW_SYSTEM_ERROR_URL, systemErrorUrl);
		outOfloginUrlPatternString=PropertiesManager.getProperty(PropertiesManager.EFW_OUTOFLOGIN_URL_PATTERN, "");
		outOfloginUrlPattern=Pattern.compile(outOfloginUrlPatternString);
		loginUrlPattern=Pattern.compile(loginUrl);
		systemErrorUrlPattern=Pattern.compile(systemErrorUrl);
	}

	@Override
	public void init(FilterConfig config) throws ServletException {}
	@Override
	public void destroy() {}

}
