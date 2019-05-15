// Time-stamp: "2018-12-27 20:06:48 phil"
// Section 7x is for Conkeror internal tweaks (?)
dumpln("72theme");

// Example: darken Astronomy Picture of the Day (APOD)
// register_user_stylesheet(
//     make_css_data_uri(["body{background: black !important; color: grey !important;}",
//                        ":link, :link * {color: #4986dd !important;}",
//                        ":visited, :visited * {color: #d75047 !important;}"],
//                       $url_prefixes = "http://apod.nasa.gov/apod/"));


// Based on http://www.featureblend.com/css-json.html

// With inheritance:
// var cssjson = {
//     ".copy-1":{
//         "font-family":"Verdana, Geneva, Arial, Helvetica, sans-serif",
//         "font-size":"11px",
//         "color":"#CCC"
//     },
//     "div#container div#header":{
//         "CSSJSON-INHERIT-SELECTOR":".copy-1",
//         "position":"absolute",
//         "top":"12px",
//         "left":"4px"
//     }
// }

// TODO write tests
function ph_generate_css (json) {
    var styleStr = "";
    for (var i in json) {
        styleStr += i + " {";
        for (var j in json[i]) {
            if (j == "CSSJSON-INHERIT-SELECTOR") {
                for (var k in json[json[i][j]]) {
                    styleStr += `${k}: "${json[json[i][j]][k]} !important"; `;
                }
            } else {
                styleStr += `${j}: "${json[i][j]} !important"; `;
            }
        }
        styleStr += "} ";
    }
    return styleStr;
}

var ph_dark_css = {
    "*" : {
        "font-style"                : "normal"            ,
        "background"                : "#404040"           ,
        "color"                     : "#cccccc"           ,
        "text-shadow"               : "0px 0px 0px black" ,
        "-moz-border-bottom-colors" : "#505050 #505050"   ,
        "-moz-border-top-colors"    : "#505050 #505050"   ,
        "-moz-border-right-colors"  : "#505050 #505050"   ,
        "-moz-border-left-colors"   : "#505050 #505050"   ,
        "box-shadow"                : "0 0 0 black"       ,
        "-moz-box-shadow"           : "0 0 0 black"       ,
        "border-color"              : "#505050"           ,
        "text-decoration"           : "none"
    },
    "code, pre, code *, pre *" : {
        "color"                     : "#f6f3e8"           ,
        "background-color"          : "#353535"
    },
    ":link, :link *" : {
        "color"                     : "#8ac6f2"
    },
    ":visited, :visited *" : {
        "color"                     : "#95e454"
    },
    "h1, h2, h3, h4, h5, h6" : {
        "color"                     : "white"
    },
    "em" : {
        "background-color"          : "#505050"
    }
};

function darken_page (I) {
    const styles = ph_generate_css(ph_dark_css);
    const document = I.window.buffers.current.document;
    if (document.createStyleSheet) {
        document.createStyleSheet(`javascript:'${styles}'`);
    } else {
        const newSS = document.createElement('link');
        newSS.rel = 'stylesheet';
        newSS.href = `data:text/css,${escape(styles)}`;
        document.getElementsByTagName("head")[0].appendChild(newSS);
    }
}

// function darken_page (I) {
//     var newSS, styles='* { background: #404040 ! important; color: #cccccc !important }'
//         + ':link, :link * { color: #8ac6f2 !important }'
//         + ':visited, :visited * { color: #95e454 !important }';

//     var document = I.window.buffers.current.document;

//     if (document.createStyleSheet) {
//         document.createStyleSheet("javascript:'" + styles + "'");
//     } else {
//         newSS=document.createElement('link');
//         newSS.rel='stylesheet';
//         newSS.href='data:text/css,'+escape(styles);
//         document.getElementsByTagName("head")[0].appendChild(newSS);
//     }
// }

interactive("darken-page", "Darken the page in an attempt to save your eyes.",
            darken_page);

define_key(content_buffer_normal_keymap, "C-M-d", "darken-page");





/*
let (home = get_home_directory()) {
    home.appendRelativePath(".conkerorrc/stylesheets/facebook-hello-kitty.css");
    register_user_stylesheet(make_uri(home).spec);
}
*/

// apod: darken
register_user_stylesheet(
    make_css_data_uri(["body{background: black !important; color: grey !important;}",
                       ":link, :link * {color: #4986dd !important;}",
                       ":visited, :visited * {color: #d75047 !important;}"],
                      $url_prefixes = "http://apod.nasa.gov/apod/"));

// conkerorwiki
register_user_stylesheet(
    make_css_data_uri(
        ["html, body { background-color: #666 !important; }",
         "#page { padding: 2px 0px !important; }",
         "#content { padding: 0px 20px; }",
         "#header, #page, #footer { max-width: 65em; background-color: white; }"],
        $url_prefixes = "http://conkeror.org"));

// graaa fix background
register_user_stylesheet(
    make_css_data_uri("body {background-color:black !important; color: white;}",
                      $url_prefixes = "http://graaa.org/"));

// emusic player (hide)
register_user_stylesheet(
    make_css_data_uri("#expandTip { display: none !important; }",
                      $domains = "www.emusic.com"));
register_user_stylesheet(
    make_css_data_uri("#player-bar-container { display: none !important; }",
                      $domains = "www.emusic.com"));

// nasa-hsf: make page more printer friendly
register_user_stylesheet(
    make_css_data_uri("img{display: none;}",
                      $url_prefixes = "http://spaceflight1.nasa.gov/realdata/sightings/cities/view.cgi"));

/*
require('selectively-unstyle');

function jjf_kill_google_colors (sheet) {
    for each (let rule in sheet.cssRules) {
        if (rule instanceof Ci.nsIDOMCSSStyleRule)
            rule.style.removeProperty('color');
    }
}

let (google = build_url_regexp(
         $domain = "google",
         $allow_www = true,
         $tlds = ["com", "co.uk", "de", "dk", "es",
                  "fr", "it", "no", "se", "uk"])) {
    selectively_unstyle_alist.push([google, jjf_kill_google_colors]);
};

let (home = get_home_directory()) {
    home.appendRelativePath(".conkerorrc/stylesheets/google-web-search-gray-unimportant.css");
    register_user_stylesheet(make_uri(home).spec);
}
*/


// On some web pages, html input boxes appear smaller than they ought to
// be, not tall enough to fit the height of the text they contain.
// Xulrunner is incorrectly applying quirks mode to these elements,
// causing them to be rendered in an emulation of Internet Explorer's
// notorious flawed box model.  It has been reported that this is related
// to issue 157.  Xulrunner 1.9.0.x has this bug, and to a lesser extent,
// so does Xulrunner 1.9.1.  Here is a work-around that you can put in
// your rc.  This first work-around has the disadvantage that it will
// result in improper sizing of fields which are *supposed* to be in
// quirks mode.
/*
register_user_stylesheet(// heavy-handed approach
    "data:text/css," +
        escape(
            "@namespace url(\"http://www.w3.org/1999/xhtml\");\n" +
            "input:not([type=\"image\"]), textarea {\n"+
            "  -moz-box-sizing: content-box !important;\n"+
            "}"));//*/
/*register_user_stylesheet(// manual approach
    "data:text/css," +
        escape(
            "@namespace url(\"http://www.w3.org/1999/xhtml\");\n"+
            "@-moz-document url-prefix(http://www.naxosmusiclibrary.com/)\n"+
            "{\n"+
            "input:not([type=\"image\"]), textarea {\n"+
            "  -moz-box-sizing: content-box !important;\n"+
            "}}"));//*/
// offending selector: input:not([type="image"])
