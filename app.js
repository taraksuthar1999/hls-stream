const express = require('express')
const fs = require('fs')
const hls = require('hls-server')
const app = new express()
const port = process.env.PORT || 3080
app.get('/',(req,res)=>{
    res.sendFile('C:/javascript/hls-stream/public/anime.html')
})
const server = app.listen(port,()=>{
    console.log('server started on port '+port);
})
new hls(server,{
    provider:{
        exists:(req,cb)=>{
            console.log(req.url)
            const ext = req.url.split('.').pop();
            if(ext !== 'm3u8' && ext !== 'ts' && ext !== 'vtt'){
                return cb(null,true);
            }
            fs.access(__dirname+req.url,fs.constants.F_OK,function(err){
                if(err){
                    console.log('in if')
                    return cb(null, false)
                }
                
                cb(null,true);
            })
        },
        getManifestStream:(req, cb)=>{
            const stream = fs.createReadStream(__dirname+req.url);
            cb(null,stream)
        },
        getSegmentStream:(req,cb)=>{
            const stream = fs.createReadStream(__dirname+req.url)
            cb(null,stream)
        }
    }
})
// https://git.heroku.com/tk-httpstream-application.git