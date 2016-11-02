var fs = require("fs")
var Twit = require("twit")


var T = new Twit({
consumer_key:         "",
consumer_secret:      "",
access_token:         "",
access_token_secret:  ""
});

function lueNaiset()
{
  return new Promise(function(resolve)
  {
    fs.readFile('naiset.csv', 'utf8', function(err, data){
      var lines = data.split('\n')
      var ret = []
      for(var i = 1; i<lines.length;i++){var line = lines[i]; if(line.length>0)ret.push(line.split(';')[0])}
            resolve(ret)
    })
  })
}

function lueMiehet ()
{
  return new Promise(function(resolve, reject)
  {
    fs.readFile('miehet.csv', 'utf8', function(err, data){
      var lines = data.split('\n')
      var ret = []
      for(var i = 1; i<lines.length;i++){var line = lines[i]; if(line.length>0)ret.push(line.split(';')[0])}
            resolve(ret)
    })
  })
}

lueNaiset().then(function(ret){
  lueMiehet().then(function(res){
    var all = ret.concat(res).sort()
    var i = 0;
    setInterval(function(){
      T.post('statuses/update', {status: all[i]})
      i++;
    },1800000)
  })
})
