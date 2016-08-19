/**
 * The class to keep messages in server.
 * 
 * @author Chang Kejun
 */
var EfwServerMessages = function() {
};
EfwServerMessages.prototype = {
	NumberType : "数字",
	DateType : "日付",
	StringType : "文字",
	SessionTimeoutException : "セッションタイムアウトになりました。再ログインしてください。",
	NumberIsReuqiredMessage : "{display-name}を数字で正しく入力してください。",
	DateIsReuqiredMessage : "{display-name}を日付で正しく入力してください。",
	IsRequiredMessage : "{display-name}を入力してください。",
	MaxLengthOverMessage : "{display-name}を{max-length}文字以内で入力してください。",
	MinOrMaxOverMessage : "{display-name}を{min}以上{max}以内の{data-type}で入力してください。",
	MinOverMessage : "{display-name}を{min}以上の{data-type}で入力してください。",
	MaxOverMessage : "{display-name}を{max}以内の{data-type}で入力してください。",
	NotAcceptMessage : "{display-name}に正しいファイルを選択してください。",
	EventIsDisable : "EventIsDisable",
};
