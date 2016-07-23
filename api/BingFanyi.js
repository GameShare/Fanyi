var request = require("superagent");

var bing = function(src, callback){

    // var src = "公式サイトAmazon.co.jp 公式サイト。お急ぎ便ご利用で当日・翌日にお届け。アマゾンで本, 1日用品, ファッション, 食品, ベビー用品, カー用品ほか一億種の商品を\nお急ぎ便ご利用で当日・翌日にお届け。アマゾンで本";

    if(typeof src !== 'string'){
        callback(new Error("bing : 第一个参数, 请输入字符串!"))
    }

    var postData = [
        {
            id : -1910809632,
            text : src
        }
    ]

    /**
     * Bing 的里面 cookie 是必须的...但不知道有效期是多久...就先拿这先用吧
     * 反正 Bing 的翻译质量是最差的...
     *
     * 获取最新 cookie 的地址 http://www.bing.com/translator/
     */
    var HTTPHeaders = {
        'Accept' : 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding' : 'gzip, deflate',
        'Accept-Language' : 'zh-CN,zh;q=0.8,zh-TW;q=0.6',
        'Cache-Control'   : 'no-cache',
        'Connection' : 'keep-alive',
        'Content-Type' : 'application/json; charset=UTF-8',
        'Host' : 'www.bing.com',
        'Origin' : 'http://www.bing.com',
        'Pragma' : 'no-cache',
        'Referer' : 'http://www.bing.com/translator/',
        'User-Agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/51.0.2704.79 Chrome/51.0.2704.79 Safari/537.36',
        'X-Requested-With' : 'XMLHttpRequest',
    }

    // 以下 Cookie 值是 Bing 翻译所必要的，获取方式为 请求 http://www.bing.com/translator/ 从响应头的 set-cookie 中可以拿到
    HTTPHeaders.Cookie = "srcLang=ja; smru_list=ja; sourceDia=ja-JP; destLang=zh-CHS; dmru_list=da%2Czh-CHS; destDia=zh-CN; mtstkn=VMevFKwd2GA3IJImx3IABcN88KwOupEpPvEEITkPIro9r6Eftg4X%2FmYpju4hT30N; MUIDB=1E9EE98C4DE76D9E0DFCE08A49E76B60;"

    request.post("http://www.bing.com/translator/api/Translate/TranslateArray?from=ja&to=zh-CHS")
        .set(HTTPHeaders)
        .send(postData)
        .end(function(err, data){

            if(err) return callback(err);

            var bingJson = JSON.parse(data.text);
            if(typeof bingJson === 'object' && bingJson.items){
                callback(null, bingJson.items[0].text)
            }
        })
}


module.exports = bing;
