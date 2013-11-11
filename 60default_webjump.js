// Time-stamp: "2013-06-22 19:01:10 phil"

dumpln("60default_webjump");

read_url_handler_list = [read_url_make_default_webjump_handler("ixquick")];

/*
What Counts as an URL?

When text is entered at the url prompt, Conkeror needs to decide whether the
text should be treated as an url, a webjump, or passed to the read-url-handlers.
Deciding what counts as an url is not as trivial as it might appear at first,
because if Mozilla is given a string which is not a well-formed url, it will
still attempt to resolve it by prepending http://, append .com, and so on. The
default behavior of read-url is to consider any string as an url if it does not
have any spaces in the middle. This behavior can be changed by overriding the
function possibly_valid_url in your rc. Here is an alternative version which
requires the string to contain either a dot or a slash to be considered as an
url. This version works better when you have configured a default webjump
because it allows the webjump to still be called when only one word is given in
the prompt.
*/

function possibly_valid_url (str) {
    return (/[\.\/]|^about:\w+/.test(str)) &&
        !(/\S\s+\S/.test(str)) &&
        !(/^\s*$/.test(str));
}
