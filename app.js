
// WARNING : 此程序因特殊原因, 需要对 superagent 的源代码进行魔改! 若 superagent 是新安装的, 请先进行魔改!!
// 魔改方式: 将 /node_modules/superagent/lib/node/index.js 的 580 行 改为
//      if (this.called) return /*console.warn('double callback!');*/

var aciba = require("./api/AcibaFanyi.js")
var baidu = require("./api/BaiduFanyi.js")
var bing = require("./api/BingFanyi.js")
var youdao = require("./api/YoudaoFanyi.js")
var google = require("./api/googleFanyi.js")
var yahoo = require("./api/YahooFanyi.js")

var words = "口癖は「働きたくない」で、座右の銘は「明日出来ることは今日やらない」。なるべく仕事したくないので第二寮の家事全般と風莉の身の回りの世話を湊に丸投げしてくる。年齢とフルネームについて言及すると深く恨みを買ってしまうらしい。"

getTranslation(words)

function getTranslation(words){
    aciba(words, function(err, data){
        if(err) throw err;  // aciba
        console.log("Aciba : " + data);
    })

    baidu(words, function(err, data){
        if(err) throw err;  // baidu
        console.log("Baidu : " + data);
    })

    // 不得不吐槽... Bing 翻译的简直是在抽风.....
    // 而且其 cookie 有时间限制....
    // 不过就这翻译水平...也不值得专门研究 cookie 的生成方式
    bing(words, function(err, data){
        if(err) throw err;  // bing
        console.log("Bing : " + data);
    })

    youdao(words, function(err, data){
        if(err) throw err;  // youdao
        console.log("Youdao : " + data);
    })

    google(words, function(err, data){
        if(err) throw err;  // google
        console.log("Google : " + data);
    })

    yahoo(words, function(err, data){
        if(err) throw err;  // yahoo
        console.log("Yahoo : " + data);
    })
}