var request = require("superagent");
var cheerio = require("cheerio");

var yahoo = function(src, callback){

    // var src = "Amazon.co.jp 公式サイト。お急ぎ便ご利用で当日・翌日にお届け。アマゾンで本, 日用品, ファッション, 食品, ベビー用品, カー用品ほか一億種の商品を\nお急ぎ便ご利用で当日・翌日にお届け。アマゾンで本";

    if(typeof src !== 'string'){
        callback(new Error("yahoo : 第一个参数, 请输入字符串!"))
    }

    // _crumb 也是有过期时间的, _crumb 的值来自于源代码的 $("#TTcrumb").val()
    // 网址: http://honyaku.yahoo.co.jp/
    var postData = {
        "p" : src,
        "ieid" : "ja",
        "oeid" : "zh",
        "results" : "1000",
        "formality" : "0",
        "output" : "json"
    }

    /**
     * 经过测试， 貌似只有 Content-Type 是必须的。。。神奇
     */
    var HTTPHeaders = {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }

    request.get("http://honyaku.yahoo.co.jp/")
        .end(function(err, data){

            var $ = cheerio.load(data.text);
            postData._crumb = $("#TTcrumb").val();

            console.log("Yahoo 翻译的_crumb是 ： " + $("#TTcrumb").val())

            request.post("http://honyaku.yahoo.co.jp/TranslationText")
                .set(HTTPHeaders)
                .send(postData)
                .end(function(err, data){
                    if(err) return callback(err);
                    
                    var yhJson = JSON.parse(data.text)

                    var text = "";

                    if(yhJson.ResultSet.ResultText && yhJson.ResultSet.ResultText.Results){
                        yhJson.ResultSet.ResultText.Results.forEach(function(item, index){
                            text += item.TranslatedText;
                        })
                        callback(null, text)
                    } else {
                        callback(new Error("雅虎翻译翻译失败!"))
                    }
                })
        })
}

module.exports = yahoo;
