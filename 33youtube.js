// Time-stamp: "2016-05-19 10:55:10 phil"

// See also 10webjumps.js

dumpln("33youtube");

var Ytu =
{
    I: null,
    url: null,
    videoFilename: null,
    audioFilename: null,

    init : function(I)
    {
        Ytu.I = I;
        Ytu.url = load_spec_uri_string(load_spec(I.buffer.top_frame));
    },

    setPath : function(path)
    {
        Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("ytu-recorder.").setCharPref('path', path);
    },

    getPath : function()
    {
        let prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("ytu-recorder.");

        /* TODO change location */
        let path = "/tmp";

        if(prefs.prefHasUserValue('path')){
            path = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("ytu-recorder.").getCharPref('path');
        }

        return path;
    },

    getVideoUrl : function()
    {
        let videoUrl = null;

        /* TODO check if youtu.be works */
        if(!(new RegExp("https?://(?:www\\.)?youtube\\.\\w{2,3}/watch\\?(?:feature\=player_embedded\&)?v\\=[a-z0-9A-Z\-_]{11,}(?:\&feature\=related)?", "")).test(Ytu.url))
        {
            throw "It's not a valid youtube url";
        }

        let videoUrlReg = new RegExp('"([^"]+generate_204[^"]+)"', "");

        if(videoUrlReg.test(Ytu.I.buffer.document.getElementsByTagName('html').item(0).innerHTML.match(videoUrlReg)))
        {
            videoUrl = Ytu.I.buffer.document.getElementsByTagName('html').item(0).innerHTML.match(videoUrlReg)[1].replace('generate_204', 'videoplayback').replace(/\\/g,'').replace(/u0026/g,'&');
        }
        else
        {
            throw "No video found";
        }

        return videoUrl;
    },

    getTitle : function()
    {
        let title = 'no title';
        let metas = Ytu.I.buffer.document.getElementsByTagName('meta');

        for (let i = 0; i < metas.length; i++)
        {
            if(metas.item(i).getAttribute('name') == 'title')
            {
                title = metas.item(i).getAttribute('content');
            }
        }

        title = encodeURI(title).replace(/%20/g, ' ');

        return title;
    },

    getCmdToDownloadVideo : function()
    {
        /* TODO try curl with resume */
        return "wget -U 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.12 Safari/535.11' -O '"+Ytu.videoFilename+"' '"+Ytu.getVideoUrl()+"'";
    },

    getCmdToExtractSound : function()
    {
        /* TODO change to ogg */
        return "ffmpeg -i '"+Ytu.videoFilename+"' -ac 2 -ab 196 -vn -y '"+Ytu.audioFilename+"'";
    },

    downloadVideo : function()
    {
        Ytu.videoFilename = Ytu.getPath()+"/"+Ytu.getTitle()+".flv";

        Ytu.I.window.minibuffer.message('Video downloading started : file would be recorded in '+Ytu.getPath()+' with name '+Ytu.getTitle());

        shell_command_blind(Ytu.getCmdToDownloadVideo());
    },

    extractSound : function()
    {
        Ytu.videoFilename = "/tmp/"+Ytu.getTitle()+".flv";
        /* TODO change to OGG */
        Ytu.audioFilename = Ytu.getPath()+"/"+Ytu.getTitle()+".mp3";

        Ytu.I.window.minibuffer.message('Sound extracting started : file would be recorded in '+Ytu.getPath()+' with name '+Ytu.getTitle());

        shell_command_blind(Ytu.getCmdToDownloadVideo()+" && "+Ytu.getCmdToExtractSound()+" && rm '"+Ytu.videoFilename+"'");
    },

    extractSoundAndDownloadVideo : function()
    {
        Ytu.videoFilename = Ytu.getPath()+"/"+Ytu.getTitle()+".flv";
        /* TODO change to OGG */
        Ytu.audioFilename = Ytu.getPath()+"/"+Ytu.getTitle()+".mp3";

        Ytu.I.window.minibuffer.message('Sound extracting and video downloading started : files would be recorded in '+Ytu.getPath()+' with name '+Ytu.getTitle());

        shell_command_blind(Ytu.getCmdToDownloadVideo()+" && "+Ytu.getCmdToExtractSound());
    }
};

interactive("ytu-download-video",
            "extract video from youtube video",
            function(I){

                Ytu.init(I);

                Ytu.downloadVideo();
            });

interactive("ytu-extract-sound",
            "extract sound from youtube video",
            function (I) {

                Ytu.init(I);

                Ytu.extractSound();
            });

interactive("ytu-extract-sound-and-download-video",
            "extract sound and video from youtube video",
            function (I) {

                Ytu.init(I);

                Ytu.extractSoundAndDownloadVideo();
            });

interactive("ytu-set-path",
            "set extracting path",
            function (I) {
                desktop_dir = get_home_directory().clone();
                desktop_dir.appendRelativePath("Desktop");
                let path = yield I.minibuffer.read($prompt = "Path to use to record sound and video : ",
                                                   $initial_value = desktop_dir.path + "/");

                Ytu.setPath(path);
            });

/*
define_key(content_buffer_normal_keymap, "y p", "ytu-set-path");
define_key(content_buffer_normal_keymap, "y s", "ytu-extract-sound");
define_key(content_buffer_normal_keymap, "y v", "ytu-download-video");
define_key(content_buffer_normal_keymap, "y b",
           "ytu-extract-sound-and-download-video");
*/

/* General media viewing */
set_default_browser_object("shell-command-on-url", browser_object_links);
// Already mapped to "X"
// define_key(content_buffer_normal_keymap, "x", "shell-command-on-url");
