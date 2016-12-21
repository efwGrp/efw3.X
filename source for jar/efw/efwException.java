/**** efw3.X Copyright 2016 efwGrp ****/
package efw;

/**
 * フレームワークの初期化と実行時発生する例外。
 * @author Chang Kejun
 */
@SuppressWarnings("serial")
public final class efwException extends Exception {
	/**
	 * イベントJavaScriptファイルの格納パスが存在しないエラー定数。
	 */
	public static final String EventFolderDoesNotExistException="EventFolderDoesNotExistException";
	/**
	 * Sql外部化XMLファイルの格納パスが存在しないエラー定数。
	 */
	public static final String SqlFolderIsNotExistsException="SqlFolderIsNotExistsException";
	/**
	 * メールテンプレートXMLファイルの格納パスが存在しないエラー定数。
	 */
	public static final String MailFolderIsNotExistsException="MailFolderIsNotExistsException";
	/**
	 * ストレジの格納パスが存在しないエラー定数。
	 */
	public static final String StorageFolderIsNotExistsException="StorageFolderIsNotExistsException";
	/**
	 * データソースが取得できないエラー定数。
	 */
	public static final String DataSourceInitFailedException="DataSourceInitFailedException";
	/**
	 * メール送信エラー定数。
	 */
	public static final String MailSendFailedExcepton="MailSendFailedExcepton";
	/**
	 * 指定IdのSql外部化XMLファイルが存在しないエラー定数。
	 */
	public static final String SqlGroupIdIsNotExistsException="SqlGroupIdIsNotExistsException";
	/**
	 * 指定IdのSqlが指定XMLファイルに存在しないエラー定数。
	 */
	public static final String SqlIdIsNotExistsException="SqlIdIsNotExistsException";
	/**
	 * 指定IdのSqlは指定XMLファイルに複数存在しているエラー定数。
	 */
	public static final String SqlIdIsDuplicateException="SqlIdIsDuplicateException";
	
	/**
	 * XMLファイルが正しくないエラー定数。
	 */
	public static final String XMLFileIsNotLegalException="XMLFileIsNotLegalException";
	/**
	 * XMLタグが正しくないエラー定数。
	 */
	public static final String XMLTagIsNotLegalException="XMLTagIsNotLegalException";
	/**
	 * Script初期化エラー定数。
	 */
	public static final String ScriptInitFailedException="ScriptInitFailedException";
	/**
	 * プロパティ初期化エラー定数。
	 */
	public static final String PropertiesInitFailedException="PropertiesInitFailedException";
	/**
	 * ログ初期化エラー定数。
	 */
	public static final String LogInitFailedException="LogInitFailedException";
	/**
	 * 指定IdのMailテンプレートXMLファイルが存在しないエラー定数。
	 */
	public static final String MailGroupIdIsNotExistsException="MailGroupIdIsNotExistsException";
	/**
	 * 指定IdのMailが指定テンプレートXMLファイルに存在しないエラー定数。
	 */
	public static final String MailIdIsNotExistsException="MailIdIsNotExistsException";
	/**
	 * 指定IdのMailは指定テンプレートXMLファイルに複数存在しているエラー定数。
	 */
	public static final String MailIdIsDuplicateException="MailIdIsDuplicateException";
	
	/**
	 * efw例外コンストラクタ。
	 * @param msg メッセージ。
	 */
	public efwException(String msg){super(msg);}
	/**
	 * efw例外コンストラクタ。
	 * @param msg メッセージ。
	 * @param information 補足情報。
	 */
	public efwException(String msg,String information){super(msg +" "+information);}

}
