var helloworld_send={};
helloworld_send.name="HelloWorld送信";
helloworld_send.paramsFormat={
        "#txtMessage":"required:true;display-name:the input message"
};
helloworld_send.fire=function(params){
    return (new Result())
        .runat("body")
        .withdata({"#txtMessage":""})
        .runat("fieldset")
        .append("<span>{message}<br></span>")
        .withdata([{"message":params["#txtMessage"]}]);
};