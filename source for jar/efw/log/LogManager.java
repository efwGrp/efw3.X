/**** efw3.X Copyright 2016 efwGrp ****/
package efw.log;

import java.io.File;
import java.io.IOException;
import java.util.logging.FileHandler;
import java.util.logging.Level;
import java.util.logging.Logger;

import efw.efwException;
import efw.properties.PropertiesManager;

/**
 * ログの作成を管理するクラス。
 * @author Chang Kejun
 *
 */
public final class LogManager {
	/**
	 * ログを作成するオブジェクト。
	 */
    private static Logger logger;
    /**
     * ログの保存パス。
     * <br>efw.propertiesのefw.logging.pathで設定、
     * デフォルトは「/logs」。
     */
    private static String logPath="/logs";
    /**
     * ログファイルの名称。
     * <br>efw.propertiesのefw.logging.nameで設定、
     * デフォルトは「/logs」。
     */
    private static String logName="efwlog%g.txt";
    /**
     * ログ出力レベル。
     * <br>efw.propertiesのefw.logging.levelで設定、
     * デフォルトは「WARNING」。
     */
    private static String logLevel="WARNING";
    /**
     * ログファイルのサイズ。
     * <br>efw.propertiesのefw.logging.limitで設定、
     * デフォルトは 10MB。
     */
    private static int logLimit=10485760;
    /**
     * ログファイルの数。
     * <br>efw.propertiesのefw.logging.numで設定、
     * デフォルトは 5。
     */
    private static int logNum=5;

    /**
     * フレームワークのログ出力を初期化する。
     * @throws IOException　ログファイルを作成できないエラー。
     */
    public synchronized static void init() throws efwException {
        
    	logPath = PropertiesManager.getProperty(PropertiesManager.EFW_LOG_FILE_PATH,logPath);
    	logName = PropertiesManager.getProperty(PropertiesManager.EFW_LOG_FILE_NAME,logName);
    	logLevel = PropertiesManager.getProperty(PropertiesManager.EFW_LOG_OUPUT_LEVEL,logLevel);
    	logLimit = PropertiesManager.getIntProperty(PropertiesManager.EFW_LOG_OUPUT_LIMIT,logLimit);
    	logNum = PropertiesManager.getIntProperty(PropertiesManager.EFW_LOG_OUPUT_NUM,logNum);

        Level level = null;
        if ("ALL".equals(logLevel)) {
            level = Level.ALL;
        } else if ("CONFIG".equals(logLevel)) {
            level = Level.CONFIG;
        } else if ("FINE".equals(logLevel)) {
            level = Level.FINE;
        } else if ("FINER".equals(logLevel)) {
            level = Level.FINER;
        } else if ("FINEST".equals(logLevel)) {
            level = Level.FINEST;
        } else if ("INFO".equals(logLevel)) {
            level = Level.INFO;
        } else if ("OFF".equals(logLevel)) {
            level = Level.OFF;
        } else if ("SEVERE".equals(logLevel)) {
            level = Level.SEVERE;
        } else if ("WARNING".equals(logLevel)) {
            level = Level.WARNING;
        }
        
        logger = Logger.getLogger(LogManager.class.getName());
        File file = new File(logPath);
        if (!file.exists()) {file.mkdirs();}
        FileHandler fh;
		try {
			fh = new FileHandler(logPath + "/" + logName, logLimit, logNum);
	        fh.setFormatter(new LogFormatter());
	        logger.addHandler(fh);
	        logger.setLevel(level);
		} catch (SecurityException e) {
			e.printStackTrace();
			throw new efwException(efwException.LogInitFailedException);
		} catch (IOException e) {
			e.printStackTrace();
			throw new efwException(efwException.LogInitFailedException);
		}
    }
    /**
     * エラーログを出力する。
     * @param value ログ内容。
     */
    public static void ErrorDebug(String value) {
        logger.log(Level.SEVERE, "[EFW.NG]" + value.replaceAll("\n", ""));
    }
    /**
     * 正常ログを出力する。
     * @param value ログ内容。
     */
    public static void CommDebug(String value) {
        logger.log(Level.INFO, "[EFW.OK]" + value.replaceAll("\n", ""));
    }
    /**
     * ワーニングログを出力する。
     * @param value ログ内容。
     */
    public static void WarningDebug(String value) {
        logger.log(Level.WARNING, "[EFW.WARNING]" + value.replaceAll("\n", ""));
    }
    
    /**
     * エラーログを出力する。
     * @param value1 ログ内容１。
     * @param value2　ログ内容２。
     */
    public static void ErrorDebug(String value1,String value2) {
        logger.log(Level.SEVERE, "[EFW.NG]" + value1.replaceAll("\n", "")+" "+value2.replaceAll("\n", ""));
    }
    /**
     * 正常ログを出力する。
     * @param value1 ログ内容１。
     * @param value2　ログ内容２。
     */
    public static void CommDebug(String value1,String value2) {
        logger.log(Level.INFO, "[EFW.OK]" + value1.replaceAll("\n", "")+" "+value2.replaceAll("\n", ""));
    }
    /**
     * ワーニングログを出力する。
     * @param value1 ログ内容１。
     * @param value2　ログ内容２。
     */
    public static void WariningDebug(String value1,String value2) {
        logger.log(Level.WARNING, "[EFW.WARNING]" + value1.replaceAll("\n", "")+" "+value2.replaceAll("\n", ""));
    }
    /**
     * 初期化時の正常ログを出力する。
     * @param value ログ内容。
     */
    public static void InitCommonDebug(String value) {
        logger.log(Level.INFO, "[EFW.INI.OK]" + value.replaceAll("\n", ""));
    }
    /**
     * 初期化時のエラーログを出力する。
     * @param value ログ内容。
     */
    public static void InitErrorDebug(String value) {
        logger.log(Level.SEVERE, "[EFW.INI.NG]" + value.replaceAll("\n", ""));
    }
    /**
     * 初期化時のエラーログを出力する。
     * @param value1 ログ内容１。
     * @param value2　ログ内容２。
     */
    public static void InitErrorDebug(String value1,String value2) {
        logger.log(Level.SEVERE, "[EFW.INI.NG]" + value1.replaceAll("\n", "")+" "+value2.replaceAll("\n", ""));
    }
}
