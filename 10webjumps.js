// Time-stamp: "2013-10-13 04:23:21 phil"

dumpln("10webjumps");


// Smart-select wrapper
// From http://conkeror.org/Tips#SelectionSearches

// selection searches
function create_selection_search(webjump, key) {
    interactive(webjump+"-selection-search",
                "Search " + webjump + " with selection contents",
                "find-url-new-buffer",
                $browser_object = function (I) {
                    return webjump + " " + I.buffer.top_frame.getSelection();});
    define_key(content_buffer_normal_keymap, key.toUpperCase(), webjump + "-selection-search");

    interactive("prompted-"+webjump+"-search", null,
                function (I) {
                    var term = yield I.minibuffer.read_url($prompt = "Search "+webjump+":",
                                                           $initial_value = webjump+" ");
                    browser_object_follow(I.buffer, FOLLOW_DEFAULT, term);
                });
    define_key(content_buffer_normal_keymap, key, "prompted-" + webjump + "-search");
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



// Java API
define_webjump("Java_API",
    "http://www.google.co.uk/search?hl=en&as_sitesearch=http://java.sun.com/javase/6/docs/api/&q=%s",
    $alternative="http://java.sun.com/javase/6/docs/api");


// Emacswiki
define_webjump("emacswiki",
        "http://www.google.com/cse?cx=004774160799092323420%3A6-ff2s0o6yi"+
            "&q=%s&sa=Search&siteurl=emacswiki.org%2F",
        $alternative="http://www.emacswiki.org/");

create_selection_search("emacswiki", "a");


// Translate
define_webjump("trans", "http://translate.google.com/translate_t#auto|en|%s");


// Cuil
define_webjump("cuil", "http://www.cuil.com/search?q=%s");


// Anagrams
define_webjump("anagram", "http://wordsmith.org/anagram/anagram.cgi?anagram=%s&t=1000&a=n");


// Firefox add-ons
define_webjump("firefox_addons", "https://addons.mozilla.org/en-US/firefox/search?q=%s");


// Org-mode wiki
define_webjump("orgmode-worg",
    "https://www.google.com/cse?cx=002987994228320350715%3Az4glpcrritm" +
        "&q=%s&sa=Search&siteurl=orgmode.org%2Fworg",
    $alternative="http://orgmode.org/worg/");

define_webjump("orgmode-orglist",
               "http://search.gmane.org/?query=%s&group=gmane.emacs.orgmode");

create_selection_search("orgmode-worg", "w");


// Multiple GMail accounts
define_webjump("gmail_ph", "https://mail.google.com/mail/u/0/"); //primary account
define_webjump("gmail_sdss", "https://mail.google.com/mail/u/1/"); //secondary account
define_webjump("gmail_dh", "https://mail.google.com/mail/u/2/"); //tertiary account


// Youtube
define_webjump("youtube", "http://www.youtube.com/results?search_query=%s&search=Search");
define_webjump("youtube-user", "http://youtube.com/profile_videos?user=%s");

create_selection_search("youtube", "h");


// GitHub
define_webjump("github", "http://github.com/search?q=%s&type=Everything");


// Send to diaspora
define_webjump("diaspora",
    "javascript:(function(){f='https://joindiaspora.com/bookmarklet?url='+encodeURIComponent(window.location.href)+'&title='+encodeURIComponent(document.title)+'&notes='+encodeURIComponent(''+(window.getSelection?window.getSelection():document.getSelection?document.getSelection():document.selection.createRange().text))+'&v=1&';a=function(){if(!window.open(f+'noui=1&jump=doclose','diasporav1','location=yes,links=no,scrollbars=no,toolbar=no,width=620,height=250'))location.href=f+'jump=yes'};if(/Firefox/.test(navigator.userAgent)){setTimeout(a,0)}else{a()}})()");
interactive("diaspora", "Sending articles to Diaspora*, one click at a time!", "find-url", $browser_object = "diaspora");


// Override built-in webjump to use new ratpoison wiki mirror:
define_webjump("ratpoisonwiki", "http://ratpoison.wxcvbn.org/?search=%s");

create_selection_search("ratpoisonwiki", "j");


// IMDB
const IMDB_URL = "http://imdb.com/";

define_webjump(
   "imdb",
   function (arg) {
       return IMDB_URL + "find?q=" +
encodeURIComponent(arg).replace(/%20/g, "+");
   },
   $alternative = IMDB_URL
);

// Ixquick
define_webjump("ixquick", "http://ixquick.com/do/metasearch.pl?query=%s");

// The Pirate Bay
define_webjump("pirate", "http://thepiratebay.sx/search/%s");

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
define_webjump("commandlinefu",
    function(term) {
        return 'http://www.commandlinefu.com/commands/matching/' +
            term.replace(/[^a-zA-Z0-9_\-]/g, '')
                .replace(/[\s\-]+/g, '-') +
            '/' + btoa(term);
    },
    $argument = 'optional',
    $alternative = "http://www.commandlinefu.com/");

// Google CodeSearch
define_webjump("codesearch", "http://www.google.com/codesearch?q=%s");

// Mozilla Dev Center
define_webjump("mozilladevcenter",
               "https://developer.mozilla.org/Special:Search?search=%s&type=fulltext&go=Search");

// eBay
define_webjump("ebay", "http://search.ebay.com/search/search.dll?query=%s");

// Lisp code
define_webjump("lispcode", "http://www.koders.com/?s=%s&li=*&la=Lisp");

// JS code
define_webjump("js", "http://www.koders.com/?s=%s&li=*&la=JavaScript");
