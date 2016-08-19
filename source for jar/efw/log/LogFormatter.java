package efw.log;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Formatter;
import java.util.logging.LogRecord;
/**
 * ログのフォーマットを定義するクラス。
 * @author Chang Kejun
 *
 */
public final class LogFormatter extends Formatter {

	/**
	 * ログに表示する日時のフォーマット。
	 * デフォルトは 「yyyy/MM/dd HH:mm:ss SSS」。
	 */
    private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss SSS");
    /**
     * ログデータをフォーマットする。
     */
    public String format(LogRecord rec) {
    	Date dt=new Date();
        StringBuffer buf = new StringBuffer();
        buf.append("[");
        buf.append(dateFormat.format(dt));
        buf.append("]");
        buf.append(formatMessage(rec));
        buf.append("\r\n");
        return buf.toString();
    }
}
