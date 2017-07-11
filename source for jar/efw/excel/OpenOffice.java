package efw.excel;

import java.io.File;
import java.net.ConnectException;

import com.artofsolving.jodconverter.DocumentConverter;
import com.artofsolving.jodconverter.openoffice.connection.OpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.connection.SocketOpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.converter.OpenOfficeDocumentConverter;

import efw.properties.PropertiesManager;

public final class OpenOffice {
	public static void toPdf(File src, File desc) throws ConnectException{
		int port = PropertiesManager.getIntProperty(PropertiesManager.EFW_OPENOFFICE_PORT,8100);
		OpenOfficeConnection connection = new SocketOpenOfficeConnection(port);
		connection.connect();
		DocumentConverter converter = new OpenOfficeDocumentConverter(connection);
		converter.convert(src, desc); 
		connection.disconnect(); 
		
	}
}
