// Time-stamp: "2019-02-20 15:42:24 phil"
// Section 1x is for URL handling tweaks (?)
dumpln("10webjumps");


require("opensearch.js");

// Smart-select wrapper
// From http://conkeror.org/Tips#SelectionSearches

// selection searches
function create_selection_search (webjump, key) {
    const webjump_selection_search = `${webjump}-selection-search`;
    interactive(webjump_selection_search,
                `Search ${webjump} with selection contents`,
                "find-url-new-buffer",
                $browser_object = function (I) {
                    return `${webjump} ${I.buffer.top_frame.getSelection()}`;});
    define_key(content_buffer_normal_keymap, key.toUpperCase(),
               webjump_selection_search);

    const prompted_webjump_search = `prompted-${webjump}-search`;
    interactive(prompted_webjump_search,
                `Search ${webjump}`,
                function (I) {
                    var term = yield I.minibuffer.read_url($prompt = `Search ${webjump}:`,
                                                           $initial_value = `${webjump} `,
                                                           $select = false);
                    browser_object_follow(I.buffer, FOLLOW_DEFAULT, term);
                });
    define_key(content_buffer_normal_keymap, key, prompted_webjump_search);
}
// examples
// create_selection_search("g","l");
// create_selection_search("wikipedia","w");
// create_selection_search("dictionary","d");
// create_selection_search("myspace","y");
// create_selection_search("amazon","a");
// create_selection_search("youtube","u");

// This is best used in conjunction with the setting:

// minibuffer_read_url_select_initial = false;


// MELPA
define_webjump("melpa", "https://melpa.org/#/?q=%s");

// ELPA
define_webjump("elpa", "https://elpa.gnu.org/packages/%s.html");

// Emacswiki
define_webjump("emacswiki",
    "https://startpage.com/do/search?query=%s%20site%3Aemacswiki.org&cat=web&cmd=process_search&" +
    "language=english&engine0=v1all&abp=-1",
    $alternative="http://www.emacswiki.org/");

create_selection_search("emacswiki", "a");


// Translate
define_webjump("trans_de", "http://translate.google.com/translate_t#de|en|%s");
define_webjump("trans_fr", "http://translate.google.com/translate_#fr|en|%s");
define_webjump("trans", "http://translate.google.com/translate_t#auto|en|%s");


// Anagrams
define_webjump("anagram", "http://wordsmith.org/anagram/anagram.cgi?anagram=%s&t=1000&a=n");


// Firefox add-ons
define_webjump("firefox_addons", "https://addons.mozilla.org/en-US/firefox/search?q=%s");


// Org-mode wiki
define_webjump("worg",
    "https://www.google.com/cse?cx=002987994228320350715%3Az4glpcrritm" +
        "&q=%s&sa=Search&siteurl=orgmode.org%2Fworg",
    $alternative="http://orgmode.org/worg/");

define_webjump("orglist",
    "http://search.gmane.org/?query=%s&group=gmane.emacs.orgmode");

create_selection_search("worg", "w");


// Multiple GMail accounts
define_webjump("gmail_ph", "https://mail.google.com/mail/u/0/"); //primary account
define_webjump("gmail_dh", "https://mail.google.com/mail/u/1/"); //secondary account


// Youtube
define_webjump("youtube", "http://www.youtube.com/results?search_query=%s&search=Search");
define_webjump("youtube-user", "http://youtube.com/profile_videos?user=%s");

create_selection_search("youtube", "y");


// GitHub
define_webjump("github", "http://github.com/search?q=%s&type=Everything");


// Send to diaspora
define_webjump("diaspora",
    "javascript:(function(){f='https://joindiaspora.com/bookmarklet?url='+encodeURIComponent(window.location.href)+'&title='+encodeURIComponent(document.title)+'&notes='+encodeURIComponent(''+(window.getSelection?window.getSelection():document.getSelection?document.getSelection():document.selection.createRange().text))+'&v=1&';a=function(){if(!window.open(f+'noui=1&jump=doclose','diasporav1','location=yes,links=no,scrollbars=no,toolbar=no,width=620,height=250'))location.href=f+'jump=yes'};if(/Firefox/.test(navigator.userAgent)){setTimeout(a,0)}else{a()}})()");
interactive("diaspora", "Sending articles to Diaspora*, one click at a time!", "find-url", $browser_object = "diaspora");


// Ratpoison
define_webjump("ratpoisonwiki", "http://ratpoison.wxcvbn.org/?search=%s");


// IMDB
var IMDB_URL = "http://imdb.com/"; // var not const for reloading

define_webjump("imdb",
   function (arg) {
       return IMDB_URL + "find?q=" +
           encodeURIComponent(arg).replace(/%20/g, "+");
   },
   $alternative = IMDB_URL
);

// Ixquick
define_webjump("ixquick", "https://ixquick.com/do/metasearch.pl?query=%s");

// Startpage
define_webjump("startpage",
    "https://startpage.com/do/search?query=%s&cat=web&cmd=process_search" +
    "&language=english&engine0=v1all&abp=-1");

create_selection_search("startpage", "h");

define_webjump("startpage-post", "https://www.startpage.com/do/search",
    $post_data = [["query", "%s"], ["cat", "web"],
                  ["cmd", "process_search"], ["language", "english"],
                  ["engine0", "v1all"], ["abp", "-1"]]);

define_webjump("startpage-image",
    "https://eu.startpage.com/do/search?query=%s&cat=pics&cmd=process_search&language=english");

// The Pirate Bay
define_webjump("pirate", "https://thepiratebay.org/search/%s/0/7/0");

// Amazon
define_webjump("amazon",
               "http://www.amazon.co.uk/exec/obidos/external-search/?field-keywords=%s&mode=blended");

// StackOverflow
define_webjump("stackoverflow","http://stackoverflow.com/search?q=%s",
               $alternative="http://stackoverflow.com");

// Bash FAQ
define_webjump("bashfaq",
    "http://mywiki.wooledge.org/BashFAQ?action=fullsearch&context=180&value=%s&fullsearch=Text",
    $alternative = "http://mywiki.wooledge.org/BashFAQ");

// CommandLineFu
/* *
define_webjump("commandlinefu",
    function(term) {
        return 'http://www.commandlinefu.com/commands/matching/' +
            term.replace(/[^a-zA-Z0-9_\-]/g, '')
                .replace(/[\s\-]+/g, '-') +
            '/' + btoa(term);
    },
    $argument = 'optional',
    $alternative = "http://www.commandlinefu.com/");
/* */
define_webjump("commandlinefu", "http://www.commandlinefu.com/commands/matching/%s");


// Mozilla Dev Center
define_webjump("mozilladevcenter",
               "https://developer.mozilla.org/Special:Search?search=%s&type=fulltext&go=Search");

// eBay
define_opensearch_webjump("ebay", "ebay-uk.xml");

// Maplin
define_webjump("maplin",
    function(arg) {
        return `http://www.maplin.co.uk/search?text=${arg.replace(/ /g, '+')}`;
    }
    );

// Lisp code search
define_webjump("lispcode", "http://code.ohloh.net/search?s=%s&fl=Lisp");

// JS code
define_webjump("js", "http://www.koders.com/?s=%s&li=*&la=JavaScript");

// Cliki (redefine)
define_webjump("cliki", "http://www.cliki.net/site/search?query=%s");

// Lisp Games wiki
define_webjump("lispgames",
    "http://lispgames.org/index.php?search=%s&go=Go&title=Special%3ASearch");

// Vimeo
define_webjump("vimeo", "http://vimeo.com/search?q=%s");


// OpenStreetMap
define_webjump("openstreetmap", "http://www.openstreetmap.org/search?query=%s");


// Wikiquote
define_webjump("wikiquote", "https://www.wikiquote.org/search-redirect.php?family=wikiquote&search=%s&language=en&go=Go");


// Google Maps
define_webjump("gmaps", "https://www.google.co.uk/maps/@52.8382004,-2.3278149,6z?hl=en&q=%s");
create_selection_search("gmaps", "p");

// AllMusic
define_webjump("allmusic", "http://www.allmusic.com/search/all/%s");


define_webjump("down?", function (url) {
    if (url) {
        return `http://downforeveryoneorjustme.com/${url}`;
    } else {
        return "javascript:window.location.href='http://downforeveryoneorjustme.com/'+window.location.href;";
    }
});

// define_webjump("wayback",
//     function (url) {
//         if (url) {
//             return "http://web.archive.org/web/*/" + url;
//         } else {
//             return "javascript:window.location.href='http://web.archive.org/web/*/'+window.location.href;";
//         }
//     },
//     $argument = "optional");

define_webjump("validate",
    "http://validator.w3.org/check?uri=%s&charset=%28detect+automatically%29&doctype=Inline&group=0");

define_webjump("validate-css",
    "http://jigsaw.w3.org/css-validator/validator?uri=%s&profile=css21&usermedium=all&warning=1&lang=en");

define_webjump("friday?", "http://docgno.me/is-it-friday-yet.php");

define_webjump("gmane", "http://gmane.org/find.php?list=%s");




/* From Firefox keyword bookmarks on lily

See: http://www.conkeror.org/Tips#Export_Firefox_Keyword_Searches_as_Conkeror_Webjumps

r4|javascript:(function(){u="http://www.bbc.co.uk/iplayer/console/radio4fm/?fm";window.open(u)})()
if|javascript:(function(){u="https://my.if.com/";window.open(u)})()
fb|javascript:(function(){u="http://www.facebook.com";window.open(u)})()
fb|javascript:(function(){u="http://stockcharts.com/charts/YieldCurve.html";window.open(u)})()
r|http://192.168.1.1:8888/doc/online.sht
pb|http://thepiratebay.se/s/?q=%s&=on&page=0&orderby=7
ew|http://www.emacswiki.org/cgi-bin/emacs?search=%s
rp|http://ratpoison.wxcvbn.org/cgi-bin/wiki.pl?search=%s
fsf|https://fsf.org/search?SearchableText=%s
osm|http://www.openstreetmap.org/search?query=%s
gm|https://maps.google.com/maps?f=q&source=s_q&output=js&hl=en&geocode=&abauth=536c862ad4UXwTFcODdhacRBhMg80ZEqqJA&authuser=0&q=%s
worg|http://www.google.com/cse?cx=002987994228320350715%3Az4glpcrritm&ie=UTF-8&q=%s
bbc|http://search.bbc.co.uk/search?uri=/&q=%s
quote|https://www.wikiquote.org/search-redirect.php?family=wikiquote&search=%s&language=en&go=Go
gmap|https://www.google.co.uk/maps/@52.8382004,-2.3278149,6z?hl=en?q=%s&=
cmd|http://www.commandlinefu.com/search/handler
cw|http://conkeror.org/FrontPage?action=fullsearch&context=180&value=%s

 */

define_webjump("isohunt",
    function(arg) {
        return "https://isohunt.to/torrents/?ihq=" + arg.replace(/ /g, '+');
    }
    );

define_webjump("snopes",
    function(arg) {
        return "http://www.snopes.com/search/?q=" + arg.replace(/ /g, '+');
    }
    );

define_webjump("bbc",
    function(arg) {
        return "http://www.bbc.co.uk/search?q=" + arg.replace(/ /g, '+');
    }
    );

define_webjump("th", "http://www.thesaurus.com/browse/%s");
define_webjump("codesearch", "http://codesearch.debian.net/search?q=%s");
define_webjump("tunefind", "https://www.tunefind.com/search/site?q=%s");
define_webjump("ettv", "https://www.ettv.tv/torrents-search.php?search=%s");
define_webjump("rarbg", "https://rarbg.to/torrents.php?search=%s&order=size&by=ASC");
define_webjump("zoo", "https://zooqle.com/search?q=%s&s=sz&v=t&sd=a");
define_webjump("canary", "https://www.thecanary.co/?s=%s");
