const ffmpeg = require('fluent-ffmpeg')
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg')
ffmpeg.setFfmpegPath(ffmpegInstaller.path)
ffmpeg('stream/Demon-slayer-ep.mkv',{timeout:432000}).addOptions(['-profile:v baseline',
'-level 3.0',
'-start_number 0',
'-hls_time 10',
'-hls_list_size 0',
'-f hls']).output('video/output.m3u8').on('end',()=>{
    console.log('end')
}).run();
// ffmpeg('assets/Demon-Slayer.mkv',{timeout:432000}).addOptions(['-map','0:s:0']).output('subtitle/subs.vtt').on('end',()=>{
//     console.log('end')
// }).run();
// ffmpeg -i Movie.mkv -map 0:s:0 subs.srt
// https://pastefg.hermietkreeft.site/?238f5f746dcc9c34#45uCT8mSEiCy5uykrBDfbjggSHk9uaNGkv2neXNHXvsk