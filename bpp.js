var request = require("superagent");

request.get("www.baidu.cqqqqm/1")
    .end(function(err, data){
        try{
            if(err) throw err;
        } catch(e) {
            console.log(1);
        }
    })