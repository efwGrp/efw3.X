/**** efw3.X Copyright 2016 efwGrp ****/
package efw.mail;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

public class MailAuthenticator extends Authenticator {
	
	String userName = "";
    String password = "";

    public MailAuthenticator() {

    }

    public MailAuthenticator(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(userName, password);
    }

}
