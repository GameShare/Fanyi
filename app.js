var aciba = require("./api/AcibaFanyi.js")
var baidu = require("./api/BaiduFanyi.js")
var bing = require("./api/BingFanyi.js")
var youdao = require("./api/YoudaoFanyi.js")
var google = require("./api/googleFanyi.js")

var words = "小悪魔発育チュ～！"

getTranslation(words)

function getTranslation(words){
    aciba(words, function(err, data){
        if(err) throw err;
        console.log("Aciba : " + data);
    })

    baidu(words, function(err, data){
        if(err) throw err;
        console.log("Baidu : " + data);
    })

    bing(words, function(err, data){
        if(err) throw err;
        console.log("Bing : " + data);
    })

    youdao(words, function(err, data){
        if(err) throw err;
        console.log("Youdao : " + data);
    })

    google(words, function(err, data){
        if(err) throw err;
        console.log("Google : " + data);
    })
}