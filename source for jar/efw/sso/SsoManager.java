/**** efw3.X Copyright 2019 efwGrp ****/
package efw.sso;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.HashMap;

import javax.xml.bind.DatatypeConverter;

import efw.properties.PropertiesManager;
/**
 * SSOを管理するクラス。
 * @author Chang Kejun
 *
 */
public class SsoManager {
	/**
	 * 認証用情報の格納場所
	 */
    private static HashMap<String,HashMap<String,String>> tokens=new HashMap<String,HashMap<String,String>>();
    /**
     * トークン作成用乱数発生機
     */
    private static SecureRandom random;
	/**
	 * SSO方式でログイン認証を行うかどうかのフラグ
	 * デフォルトはfalse。
	 */
	private static boolean ssoEnable=false;
	
	public final static boolean isSsoEnable(){
		return ssoEnable;
	}
    
    /**
     * 初期化
     * トークン作成用乱数発生機を初期化する。
     */
    public final static void init(){
    	try {
			random=SecureRandom.getInstance("SHA1PRNG");
			random.setSeed(random.generateSeed(64));
			ssoEnable=PropertiesManager.getBooleanProperty(PropertiesManager.EFW_SSO_ENABLE, ssoEnable);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
	}
    /**
     * 認証用トークンIDを作成する。
     * @return トークンID
     */
    protected final static String createTokenId(){
    	byte[] buf = new byte[64];
    	random.nextBytes(buf);
    	return DatatypeConverter.printBase64Binary(buf).replace("+", "-").replace("/", "_").replace("=", "");
    }
    /**
     * 認証情報を取得する。
     * @param sessionid 取得したいセッションID
     * @return 認証情報
     */
    protected synchronized final static HashMap<String, String> get(String sessionid){
    	return SsoManager.tokens.get(sessionid);
    }
    /**
     * 認証情報を記録する。
     * @param sessionid 記録したいセッションID
     * @param map 記録したい認証情報
     */
    protected synchronized final static void put(String sessionid,HashMap<String,String> map){
    	SsoManager.tokens.put(sessionid, map);
    }
    /**
     * 記録した認証情報を削除する。
     * @param sessionid 削除したいセッションID
     */
    protected synchronized final static void remove(String sessionid){
    	SsoManager.tokens.remove(sessionid);
    }
}
