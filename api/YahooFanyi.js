var request = require("superagent");

var yahoo = function(src, callback){

    // var src = "Amazon.co.jp 公式サイト。お急ぎ便ご利用で当日・翌日にお届け。アマゾンで本, 日用品, ファッション, 食品, ベビー用品, カー用品ほか一億種の商品を\nお急ぎ便ご利用で当日・翌日にお届け。アマゾンで本";

    if(typeof src !== 'string'){
        callback(new Error("yahoo : 第一个参数, 请输入字符串!"))
    }

    // 尚不清楚 _crumb 是怎么算出来的
    // 网址: http://honyaku.yahoo.co.jp/
    var postData = {
        "p" : src,
        "ieid" : "ja",
        "oeid" : "zh",
        "results" : "1000",
        "formality" : "0",
        "_crumb" : "sbPIpdkCOZy09QebjbUVDY69fMydBWNbWVDzkIKpKt2TJiO5ptZJhHIeHKB53Lyz3ZQOm4SP7jxqeVId1K_qN3QHtbtv6w--",
    }

    /**
     * 经过测试， 貌似只有 Content-Type 是必须的。。。神奇
     */
    var HTTPHeaders = {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }

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
}

module.exports = yahoo;
