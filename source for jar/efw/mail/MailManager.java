package efw.mail;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import efw.efwException;
import efw.properties.PropertiesManager;


/**
 * MailテンプレートXMLを管理するクラス。
 * @author Chang Kejun
 *
 */
public final class MailManager {
	/**
	 * ネーミング操作の開始コンテキストの名称。
	 * 「java:comp/env」に固定。
	 */
	private static final String JAVA_INITCONTEXT_NAME="java:comp/env";
	/**
	 * フレームワークに利用するjavaメールセッションの名称。
	 * <br>efw.propertiesのefw.mail.resourceで設定、
	 * デフォルトは「mail/efw」。
	 */
    private static String mailResourceName="mail/efw";
    /**
     * javaメールセッション。
     */
    private static Session mailSession;
	/**
	 * MailテンプレートXMLファイルの格納パス。
	 * サーブレットから渡される。
	 */
    private static String mailFolder;
    /**
     * デバッグモードを制御するフラグ。
	 * サーブレットから渡される。
     */
    private static boolean isDebug;
    /**
     * サーブレットから設定情報を受け取り、MailテンプレートXMLファイルをロードする。
     * @param mailFolder　MailテンプレートXMLファイルの格納パス。
     * @param isDebug　デバッグモード制御フラグ。
     * @throws efwException　MailテンプレートXMLファイルの読み取りエラー。
     */
	public synchronized static void init(String mailFolder,boolean isDebug) throws efwException{
		MailManager.mailFolder=mailFolder;
		MailManager.isDebug=isDebug;
		
    	//keep the Mails folder in local param.
    	//seek xml in the folder
		File dir = new File(MailManager.mailFolder);
		File[] files = dir.listFiles(
			new FilenameFilter() {
				public boolean accept(File file, String name) {
					boolean ret = name.endsWith(".xml");
					return ret;
				}
			}
		);
		for (File fl:files){
			//the file name is group id
			String fileName=fl.getName();
		    String groupId=fileName.substring(0, fileName.lastIndexOf("."));
			//load it to local param aryData
			load(groupId);
		}

		try {
			mailResourceName=PropertiesManager.getProperty(PropertiesManager.EFW_MAIL_RESOURCE,mailResourceName);
	        if(mailResourceName.indexOf("java:")>-1){//if the mail resouce begins from [java:], it is full jndi name.
	        	mailSession = (Session) new InitialContext().lookup(mailResourceName);
	        }else{//or it begins by [java:comp/env/]
	        	mailSession = (Session) new InitialContext().lookup(JAVA_INITCONTEXT_NAME+"/"+mailResourceName);
	        }
		} catch (NamingException e) {
			e.printStackTrace();
    		throw new efwException(efwException.DataSourceInitFailedException,mailResourceName);
		}
	}
	/**
	 * メールを送信
	 * @param mailId
	 * @param params
	 * @throws efwException 
	 */
	public static void send(String groupId,String mailId,Map<String,String> params) throws efwException{
		Mail mail=get(groupId,mailId);
		Message message = new MimeMessage(mailSession);
		try {
			String to=mail.getTo(params);
			if (to!=null&&!"".equals(to)){
				String[] ary=to.split(";");
				for(int i=0;i<ary.length;i++){
					if(!"".equals(ary[i]))message.addRecipient(Message.RecipientType.TO, new InternetAddress(ary[i]));
				}
			}
			String cc=mail.getCc(params);
			if (cc!=null&&!"".equals(cc)){
				String[] ary=to.split(";");
				for(int i=0;i<ary.length;i++){
					if(!"".equals(ary[i]))message.addRecipient(Message.RecipientType.CC, new InternetAddress(ary[i]));
				}
			}
			String bcc=mail.getBcc(params);
			if (bcc!=null&&!"".equals(bcc)){
				String[] ary=to.split(";");
				for(int i=0;i<ary.length;i++){
					if(!"".equals(ary[i]))message.addRecipient(Message.RecipientType.BCC, new InternetAddress(ary[i]));
				}
			}
			String subject=mail.getSubject(params);
			if (subject!=null&&!"".equals(subject)){
				message.setSubject(subject);
			}
			String body=mail.getBody(params);
			if (body!=null&&!"".equals(body)){
				message.setContent(body,"text/plain;charset=UTF-8");//text/html;charset=UTF-8
			}
			message.setFrom();
			Transport.send(message);
		} catch (AddressException e) {
			e.printStackTrace();
    		throw new efwException(efwException.MailSendFailedExcepton,e.getMessage());
		} catch (MessagingException e) {
			e.printStackTrace();
    		throw new efwException(efwException.MailSendFailedExcepton,e.getMessage());
		}
	}
	
	/**
	 * ひとつのMailオブジェクトを取得する。
	 * デバッグモードの場合、最終更新日時により再ロードするか否か判断する。
	 * 通常モードの場合、予めロード済みデータから、Sqlオブジェクトを探す。
	 * @param groupId MailテンプレートXMLファイルのファイル名（拡張子を除く）。
	 * @param mailId　mailタグに定義するid。
	 * @return　Mailオブジェクト。
	 * @throws efwException　Mail外部化XMLファイルの定義エラーか、存在しないエラーか。
	 */
	private static synchronized Mail get(String groupId,String mailId) throws efwException{
		//if it is debug mode,check the updating and reload xml if it is needed.
		if (MailManager.isDebug){
			if(checkModifyTime(groupId)){
				groups.remove(groupId);
				load(groupId);
			}
		}
		//get group
		HashMap<String,Mail> group=groups.get(groupId);
		//if group is not exists, it is wrong group id
		if (group==null){
			throw new efwException(efwException.MailGroupIdIsNotExistsException,groupId);
		}else{
			//get mail
			Mail mail=group.get(mailId);
			//if mail is not exists, it is wrong mail id
			if(mail==null){
				throw new efwException(efwException.MailIdIsNotExistsException,mailId);
			}else{
				return mail;
			}
		}
	}
	/**
	 * 予めロード済みデータのMailオブジェクトの最終更新日時は、実ファイルと同じか否かをチェックする。
	 * @param groupId MailテンプレートXMLファイルのファイル名（拡張子を除く）。
	 * @return 最終更新日時が変更なしの場合 true　。
	 */
	private static synchronized boolean checkModifyTime(String groupId){
		HashMap<String,Mail> group=groups.get(groupId);
		if (group==null){
			return true;//xml file is not in memory,so it is need to reload
		}else{
			for(String key:group.keySet()){
				Mail mail=group.get(key);
				Date mailLastModifytime=mail.getLastModifytime();
				Date fileLastModifytime = new Date(new File(MailManager.mailFolder+"/"+groupId+".xml").lastModified());
				if (!mailLastModifytime.equals(fileLastModifytime)){
					return true;//xml file is modified, so it is need to reload
				}else{
					return false;//xml file is not modified
				}
			}
			return true;//mail is not exists ,so it is need to reload
		}
	}
	/**
	 * MailテンプレートXMLファイルのファイル名によりロードする。
	 * @param groupId MailテンプレートXMLファイルのファイル名（拡張子を除く）。
	 */
	///////////////////////////////////////////////////////////////////////////
	private static synchronized void load(String groupId) throws efwException{
		String filename=MailManager.mailFolder+"/"+groupId+".xml";
		File fl=new File(filename);
		Date lastModifytime=new Date(fl.lastModified());
		//add a new map by file name in aryData 
		groups.put(groupId,new HashMap<String,Mail>());
		//read xml to get Mails 
		NodeList mails;
		try {
			mails = DocumentBuilderFactory.newInstance().newDocumentBuilder()
								.parse(fl)
								.getDocumentElement()
								.getElementsByTagName("mail");
		} catch (SAXException e) {
			throw new efwException(efwException.XMLFileIsNotLegalException,filename);
		} catch (IOException e) {
			throw new efwException(efwException.XMLFileIsNotLegalException,filename);
		} catch (ParserConfigurationException e) {
			throw new efwException(efwException.XMLFileIsNotLegalException,filename);
		}
		//get sql from element
		for(int i=0;i<mails.getLength();i++){
			Node node = mails.item(i);
			if (node.getNodeType() == Node.ELEMENT_NODE){
				Element element= (Element)node;
				String mailId=element.getAttribute("id");
				if (groups.get(groupId).get(mailId)==null){
					groups.get(groupId).put(mailId, new Mail(element,lastModifytime));
				}else{
					throw new efwException(efwException.MailIdIsDuplicateException,mailId);
				}
			}
		}
	}
	/**
	 * ロードするMailテンプレートXMLファイルを格納するオブジェクト。
	 */
	private static HashMap<String,HashMap<String,Mail>> groups=new HashMap<String,HashMap<String,Mail>>();

}
