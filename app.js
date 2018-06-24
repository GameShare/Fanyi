
// WARNING : 此程序因特殊原因, 需要对 superagent 的源代码进行魔改! 若 superagent 是新安装的, 请先进行魔改!!
// 魔改方式: 将 /node_modules/superagent/lib/node/index.js 的 580 行 改为
//      if (this.called) return /*console.warn('double callback!');*/

var aciba = require("./api/AcibaFanyi.js")
var baidu = require("./api/BaiduFanyi.js")
var bing = require("./api/BingFanyi.js")
var youdao = require("./api/YoudaoFanyi.js")
var google = require("./api/googleFanyi.js")
var yahoo = require("./api/YahooFanyi.js")

var googleThroughEn = require("./api/googleFanyi_throughEn.js")

var words = "10月24日の夜。あるマンションの3階で、常識ではありえない焼死体が発見された。被害者は10代から30代の女性。全裸でテーブルに乗せられており、丸焼き料理にでもされたみたいに、口から鉄骨を突き出した状態で消し炭にされていた。しかも被害者は拓留たちがよく知る人物で……。"

getTranslation(words)

function getTranslation(words){
    aciba(words, function(err, data){
        if(err) console.error("爱词霸发生错误" + err);  // aciba
        console.log("Aciba : " + data);
    })

    baidu(words, function(err, data){
        if(err) console.error("百度发生错误" + err);  // baidu
        console.log("Baidu : " + data);
    })

    // 不得不吐槽... Bing 翻译的简直是在抽风.....
    // 而且其 cookie 有时间限制....
    // 不过就这翻译水平...也不值得专门研究 cookie 的生成方式
    bing(words, function(err, data){
        if(err) console.error("bing发生错误" + err);  // bing
        console.log("Bing : " + data);
    })

    youdao(words, function(err, data){
        if(err) console.error("有道发生错误" + err);  // youdao
        console.log("Youdao : " + data);
    })

    google(words, function(err, data){
        if(err) console.error("google发生错误" + err);  // google
        console.log("Google : " + data);
    })

    // yahoo(words, function(err, data){
    //     if(err) console.error("yahoo发生错误" + err);  // yahoo
    //     console.log("Yahoo : " + data);
    // })

    googleThroughEn(words, function(err, data){
        if(err) console.error("google2发生错误" + err);  // yahoo
        console.log("GoogleThroughEn : " + data);
    })
}