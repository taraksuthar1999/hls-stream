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
//////////////////


////////////////////////ffmpeg
// const ffmpeg = require('fluent-ffmpeg')
// const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg')
// ffmpeg.setFfmpegPath(ffmpegInstaller.path)
// ffmpeg('assets/Demon Slayer.mkv',{timeout:432000}).addOptions(['-profile:v baseline',
// '-level 3.0',
// '-start_number 0',
// '-hls_time 10',
// '-hls_list_size 0',
// '-f hls']).output('video/output.m3u8').on('end',()=>{
//     console.log('end')
// }).run();
// ffmpeg('assets/Demon-Slayer.mkv',{timeout:432000}).addOptions(['-map','0:s:0']).output('subtitle/subs.vtt').on('end',()=>{
//     console.log('end')
// }).run();
// ffmpeg -i Movie.mkv -map 0:s:0 subs.srt
// https://pastefg.hermietkreeft.site/?238f5f746dcc9c34#45uCT8mSEiCy5uykrBDfbjggSHk9uaNGkv2neXNHXvsk