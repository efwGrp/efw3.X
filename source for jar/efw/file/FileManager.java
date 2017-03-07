/**** efw3.X Copyright 2016 efwGrp ****/
package efw.file;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.mozilla.universalchardet.UniversalDetector;

import efw.efwServlet;
/**
 * アップロードとダウンロードファイルを管理するクラス。
 * @author Chang Kejun
 */
public final class FileManager {
	/**
	 * ファイルの格納パス。
	 * サーブレットから渡される。
	 */
    private static String storageFolder;
    /**
     * アップロード情報を格納するセッションキー
     */
    private static final String EFW_UPLOAD="EFW_UPLOAD";    
    
    /**
     * サーブレットから設定情報を受け取る。
     */
	public static synchronized void init(String storageFolder){
		FileManager.storageFolder=storageFolder;
	}
	/**
	 * ファイルの格納パスを取得する。
	 * @return　 ファイルの格納パス。
	 */
	public static String getStorageFolder(){
		return storageFolder;
	}
	/**
	 * 拡張子で指定相対パス内のファイル＆フォルダのリストを取得する
	 * @param path　ファイルの格納パスからの相対パス
	 * @param ext　拡張子
	 * @return　ファイルとサブフォルダのリスト
	 */
	public static File[] getListByExt(String path,String ext){
		File fl=get(path);
		ArrayList<File> temp=new ArrayList<File>();
		if(fl.exists()){//もしフォルダが存在する場合
			File[] files= fl.listFiles();
	 		for(int i=0;i<files.length;i++){
	 			if (files[i].getName().endsWith("."+ext)){
	 				temp.add(files[i]);
	 			}
	 		}
		}
 		File[] ret=new File[temp.size()];
 		for(int i=0;i<temp.size();i++){
 			ret[i]= temp.get(i);
 		}
		return ret;
	}
	public static File[] getListByExtByAbsolutePath(String absolutePath,String ext){
		File fl=new File(absolutePath);
		ArrayList<File> temp=new ArrayList<File>();
		if(fl.exists()){//もしフォルダが存在する場合
			File[] files= fl.listFiles();
	 		for(int i=0;i<files.length;i++){
	 			if (files[i].getName().endsWith("."+ext)){
	 				temp.add(files[i]);
	 			}
	 		}
		}
 		File[] ret=new File[temp.size()];
 		for(int i=0;i<temp.size();i++){
 			ret[i]= temp.get(i);
 		}
		return ret;
	}
	/**
	 * 指定相対パス内のファイル＆フォルダのリストを取得する
	 * @param path　ファイルの格納パスからの相対パス
	 * @return　ファイルとサブフォルダのリスト
	 */
	public static File[] getList(String path){
		File fl=get(path);
		return fl.listFiles();
	}
	public static File[] getListByAbsolutePath(String absolutePath){
		File fl=new File(absolutePath);
		return fl.listFiles();
	}
	public static File get(String path){
		if(path==null)path="";
		File fl=new File(storageFolder+"/"+path);
		return fl;
	}
	public static File getByAbsolutePath(String absolutePath){
		if(absolutePath==null)absolutePath="";
		File fl=new File(absolutePath);
		return fl;
	}
	
	public static long getFolderSize(File dir) {
	    long size = 0;
	    for (File file : dir.listFiles()) {
	        if (file.isFile()) {
	            size += file.length();
	        }
	        else
	            size += getFolderSize(file);
	    }
	    return size;
	}
	/**
	 * 
	 * @param path
	 */
	public static void remove(String path){
		_delete(get(path));
	}
    private static void _delete(File f){
        if(!f.exists()) return;	//ファイルまたはディレクトリが存在しない場合は何もしない
        else if(f.isFile()) f.delete();//ファイルの場合は削除する
        else if(f.isDirectory()){//ディレクトリの場合は、すべてのファイルを削除する
            File[] files = f.listFiles();//対象ディレクトリ内のファイルおよびディレクトリの一覧を取得
            for(int i=0; i<files.length; i++) FileManager._delete( files[i] );//ファイルおよびディレクトリをすべて削除  自身をコールし、再帰的に削除する
            f.delete();//自ディレクトリを削除する
        }
    }
    
    /**
	 * ファイルを圧縮する。
	 * @param filename 圧縮後のファイル名。
	 * @param paths 圧縮対象のファイル配列。
	 * @throws IOException ファイルアクセスエラー。
	 */
	public static void zip(String filename, String[] paths, String basePath) throws IOException{
		ZipOutputStream zos = new ZipOutputStream(new BufferedOutputStream(new FileOutputStream(get(filename))));
		try{
			_zip(zos,paths,basePath);
		}finally{
			zos.close();
		}
	}
	
	private static void _zip(ZipOutputStream zos,String[] paths, String basePath) throws IOException {
		for (String path : paths) {
			File fl=get(path);
			if(fl.isDirectory()){
				File[] f = getList(path);
				String[] paths2=new String[f.length];
			    for(int i=0;i<f.length;i++){
			    	paths2[i] = path +"/" + f[i].getName();
			    }
			    _zip(zos,paths2,basePath);
			}else{
				byte[] buf = new byte[1024];
	            InputStream is = new BufferedInputStream(new FileInputStream(fl));
	            try{
	            	//ベースフォルダからzipのrootを作成する。
	            	if (path.indexOf(basePath)==0){
	            		path=path.substring(basePath.length());
	            		if (path.indexOf("/")==0){
	            			path=path.substring(1);
	            		}
	            	}
		            zos.putNextEntry(new ZipEntry(path));
		            int len = 0;
		            while ((len = is.read(buf)) != -1) {
		            	zos.write(buf, 0, len);
		            }
		            zos.closeEntry();
	            }finally{
		            is.close();
	            }
			}
        }	
	}
////////////////////////////////////////////////////////////////
	/**
	 * ひとつのアップロードファイルを
	 * @param path
	 * @throws IOException
	 */
	public synchronized static void saveSingleUploadFile(String path) throws IOException{
		String destPath=storageFolder+"/"+path;
		@SuppressWarnings("unchecked")
		HashMap<String, String> map= (HashMap<String, String>)efwServlet.getRequest().getSession().getAttribute(EFW_UPLOAD);
		if (map==null){
			return;
		}else{
			for(HashMap.Entry<String, String> entry : map.entrySet()) {
				String srcPath=entry.getValue();
				duplicateByAbsolutePath(srcPath,destPath);
		        new File(srcPath).delete();
		        break;
			}
		}
		efwServlet.getRequest().getSession().removeAttribute(EFW_UPLOAD);
		
	}
	/***
	 *　アップロードされたファイルを全部相対パスで保存する。
	 * @param path　スドレジからの相対パス
	 * @throws IOException 
	 */
	public synchronized static void saveUploadFiles(String path) throws IOException{
		if (path==null||"".equals(path)){
			path=storageFolder;
		}else{
			path=storageFolder+"/"+path;
		}
		
		@SuppressWarnings("unchecked")
		HashMap<String, String> map= (HashMap<String, String>)efwServlet.getRequest().getSession().getAttribute(EFW_UPLOAD);
		if (map==null){
			return;
		}else{
			for(HashMap.Entry<String, String> entry : map.entrySet()) {
				String srcPath=entry.getValue();
				String uploadFileName=entry.getKey();
				int destFileNamefromIndex=0;
				if (uploadFileName.lastIndexOf("\\")>-1){
					destFileNamefromIndex=uploadFileName.lastIndexOf("\\")+1;
				//}else if(uploadFileName.lastIndexOf("/")>-1){
				//	destFileNamefromIndex=uploadFileName.lastIndexOf("/")+1;
				}else{
					destFileNamefromIndex=0;
				}
				String destPath=path+"/"+uploadFileName.substring(destFileNamefromIndex);
				duplicateByAbsolutePath(srcPath,destPath);
		        new File(srcPath).delete();
			}
		}
		efwServlet.getRequest().getSession().removeAttribute(EFW_UPLOAD);
	}
	/***
	 * アップロードされて一時保存中のファイルを削除する。
	 */
	public synchronized static void removeUploadFiles(){
		@SuppressWarnings("unchecked")
		HashMap<String, String> map= (HashMap<String, String>)efwServlet.getRequest().getSession().getAttribute(EFW_UPLOAD);
		if (map==null){
			return;
		}else{
			for(HashMap.Entry<String, String> entry : map.entrySet()) {
				String srcPath=entry.getValue();
		        new File(srcPath).delete();
			}
		}
		efwServlet.getRequest().getSession().removeAttribute(EFW_UPLOAD);
	}
	
	/***
	 * アッポロードファイル名と一時ファイルパスをセッションに格納する
	 * @param uploadFileName　アッポロードファイル名（クライアントパスと名称）
	 * @param tempFileAbsolutePath　一時ファイルパス（サーバ絶対パスと名称）
	 */
	public synchronized static void keepUploadFile(String uploadFileName,String tempFileAbsolutePath){
		@SuppressWarnings("unchecked")
		HashMap<String, String> map= (HashMap<String, String>)uploadServlet.getRequest().getSession().getAttribute(EFW_UPLOAD);
		if (map==null){
			map=new HashMap<String, String>();
			uploadServlet.getRequest().getSession().setAttribute(EFW_UPLOAD,map);
		}
		String oldTempFileAbsolutePath=map.get(uploadFileName);
		if (oldTempFileAbsolutePath!=null) new File(oldTempFileAbsolutePath).delete();
		map.put(uploadFileName, tempFileAbsolutePath);
	}
	/**
	 * ファイルのMimeTypeを取得する。
	 * フォルダはdirectory。確定できない場合、application/octet-stream
	 * @param absolutePath
	 * @return
	 */
	public static String getMimeType(String absolutePath){
		String mime;
		try {
			Path path=Paths.get(absolutePath);
			if (path.toFile().isDirectory()){
				mime="directory";
			}else{
				mime=Files.probeContentType(path);
				if (mime==null)mime="application/octet-stream";
			}
		} catch (IOException e) {
			mime="application/octet-stream";
		}
		return mime;
	}
	/**
	 * フォルダを作成する
	 * @param path
	 */
	public static void makeDir(String path){
		if (path==null||"".equals(path)){
			path=storageFolder;
		}else{
			path=storageFolder+"/"+path;
		}
		File p=new File(path);
		if (!p.exists())p.mkdirs();
	}
	/**
	 * テキストファイルを読み取る。文字コードは自動判断する。
	 * @param path
	 * @return
	 * @throws IOException
	 */
	public static String readAllLines(String path) throws IOException{
		if (path==null||"".equals(path)){
			path=storageFolder;
		}else{
			path=storageFolder+"/"+path;
		}
		File file=new File(path);
		UniversalDetector detector = new UniversalDetector(null);
		String encoding;
		FileInputStream in=new FileInputStream(file);
		ByteArrayOutputStream bao = new ByteArrayOutputStream();
		byte[] buff = new byte[8000];
		int bytesRead;
        while ((bytesRead = in.read(buff)) != -1) {
            bao.write(buff, 0, bytesRead);
        }
        in.close();
        byte[] data = bao.toByteArray();
        detector.handleData(data, 0, data.length);
        detector.dataEnd();
        encoding = detector.getDetectedCharset();
        detector.reset();
        if(encoding!=null){
            return new String(Files.readAllBytes(Paths.get(path)), Charset.forName(encoding));
        }else{
        	return new String(Files.readAllBytes(Paths.get(path)));
        }
	}
	/**
	 * ファイルまたはフォルダ名を変更する。
	 * @param orgPath
	 * @param newName
	 * @throws IOException
	 */
	public static void rename(String orgPath,String newName) throws IOException{
		if (orgPath==null||"".equals(orgPath)){
			orgPath=storageFolder;
		}else{
			orgPath=storageFolder+"/"+orgPath;
		}
		Path source = Paths.get(orgPath);
		Files.move(source, source.resolveSibling(newName));
	}
	/**
	 * からのファイルを作成する。
	 * @param path
	 * @throws IOException
	 */
	public static void makeFile(String path) throws IOException{
		if (path==null||"".equals(path)){
			path=storageFolder;
		}else{
			path=storageFolder+"/"+path;
		}
		File p=new File(path);
		if (!p.exists())p.createNewFile();
	}
	/**
	 * テキストを書き込む。
	 * @param path
	 * @param content
	 * @param encoding
	 * @throws IOException
	 */
	public static void writeAllLines(String path,String content,String encoding) throws IOException{
		if (path==null||"".equals(path)){
			path=storageFolder;
		}else{
			path=storageFolder+"/"+path;
		}
		Files.write(Paths.get(path), content.getBytes(encoding),StandardOpenOption.WRITE);
	}
	/**
	 * ファイルを複製する。
	 * @param srcPath
	 * @param destPath
	 * @throws IOException
	 */
	public static void duplicate(String srcPath,String destPath) throws IOException{
		String absSrcPath,absDestPath;
		if (srcPath==null||"".equals(srcPath)){
			absSrcPath=storageFolder;
		}else{
			absSrcPath=storageFolder+"/"+srcPath;
		}
		if (destPath==null||"".equals(destPath)){
			absDestPath=storageFolder;
		}else{
			absDestPath=storageFolder+"/"+destPath;
		}
		duplicateByAbsolutePath(absSrcPath,absDestPath);
	}
	public static void duplicateByAbsolutePath(String absSrcPath,String absDestPath) throws IOException{
		File fileSrc=new File(absSrcPath);
		File fileDest=new File(absDestPath);
		boolean doCopy=false;
		if (fileSrc.isFile()){
			doCopy=true;
			if(fileDest.exists())_delete(fileDest);
		}else if (!fileDest.exists()){
			doCopy=true;
		}
		if (absDestPath.lastIndexOf("/")>-1){//フォルダがある場合、フォルダの存在を確保する
			new File(absDestPath.substring(0, absDestPath.lastIndexOf("/"))).mkdirs();
		}
		if (doCopy){
			Files.copy(Paths.get(absSrcPath),Paths.get(absDestPath),StandardCopyOption.REPLACE_EXISTING,StandardCopyOption.COPY_ATTRIBUTES);
		}
		if (fileSrc.isDirectory()){
			File lst[]=fileSrc.listFiles();
			for(int i=0;i<lst.length;i++){
				String subSrcPath=absSrcPath+"/"+lst[i].getName();
				String subDestPath=absDestPath+"/"+lst[i].getName();
				duplicateByAbsolutePath(subSrcPath,subDestPath);
			}
		}
	}
	
}
