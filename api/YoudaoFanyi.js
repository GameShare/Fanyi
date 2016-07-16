var request = require("superagent");

var youdao = function(src, callback){

    // var src = "Amazon.co.jp 公式サイト。お急ぎ便ご利用で当日・翌日にお届け。アマゾンで本, 日用品, ファッション, 食品, ベビー用品, カー用品ほか一億種の商品を\nお急ぎ便ご利用で当日・翌日にお届け。アマゾンで本";

    if(typeof src !== 'string'){
        callback(new Error("youdao : 第一个参数, 请输入字符串!"))
    }

    var postData = {
        type        : 'JA2ZH_CN',
        doctype     : 'json',
        i           : unescape(encodeURIComponent(src)),
        xmlVersion  : '1.8',
        keyfrom     : 'fanyi.web',
        ue          : 'UTF-8',
        action      : 'FY_BY_CLICKBUTTON',
        typoResult  : true
    }

    /**
     * 经过测试， 貌似只有 Content-Type 是必须的。。。神奇
     */
    var HTTPHeaders = {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }

    request.post("http://fanyi.youdao.com/translate?smartresult=dict&smartresult=rule&smartresult=ugc")
        .set(HTTPHeaders)
        .send(postData)
        .end(function(err, data){

            if(err) return callback(err);

            var ydJson = JSON.parse(data.text);

            var text = '';

            if(typeof ydJson === 'object'){
                if(ydJson.errorCode !== 0) return console.log("Error: 有道翻译翻译失败!")
                for(var i = 0; i < ydJson.translateResult.length; i++){
                    for(var j = 0; j < ydJson.translateResult[i].length; j++){
                        text += ydJson.translateResult[i][j].tgt;
                    }
                    if(i !== ydJson.translateResult.length - 1) text += '\n';
                }
            }

            callback(null, text)
        })
}

module.exports = youdao;
