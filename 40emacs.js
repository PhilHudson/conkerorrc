// Time-stamp: "2013-10-07 10:21:14 phil"

dumpln("40emacs");

/*
(setq browse-url-browser-function 'browse-url-generic
      browse-url-generic-program "/path/to/conkeror")
*/

view_source_use_external_editor = true;
// edit-current-field-in-external-editor is on C-i when a text field/area has
// focus


// To make temp files used by external editor end in ".foo":
//external_editor_extension_overrides.set("text/plain", "foo");

var default_external_editor_make_base_filename =
    (default_external_editor_make_base_filename ||
     external_editor_make_base_filename);
external_editor_make_base_filename = function (elem, top_doc) {
    return "conkeror-edit-" +
        default_external_editor_make_base_filename(elem, top_doc);
};

//  org-remember

function org_remember(url, title, text, window) {
var eurl = encodeURIComponent(url);
var etitle = encodeURIComponent(title);
var etext = encodeURIComponent(text);
var cmd_str = "org-protocol://remember://" + eurl + "/" + etitle + "/" + etext;
window.minibuffer.message("Issuing " + cmd_str);
shell_command_blind("emacsclient -c \"" + shell_quote(cmd_str) + "\"");
}

interactive("org-remember", "Remember the current url with org-remember",
                            function (I) {
                            org_remember(I.buffer.display_uri_string,
                                         I.buffer.document.title,
                                         I.buffer.top_frame.getSelection(),
                                         I.window);
                            }
                            );
define_key(content_buffer_normal_keymap, "C-c r", "org-remember");

// TODO evaluate above's effectiveness; recommended current approach is to
// duplicate org_capture below, replacing 'capture' with 'remember' throughout

// org-protocol stuff
function org_capture (url, title, selection, window) {
    var cmd_str = 'emacsclient \"org-protocol:/capture:/w/'+url+'/'+title+'/'+selection+'\"';
    if (window != null) {
      window.minibuffer.message('Issuing ' + cmd_str);
    }
    shell_command_blind(cmd_str);
}

interactive("org-capture", "Clip url, title, and selection to capture via org-protocol",
          function (I) {
              org_capture(encodeURIComponent(I.buffer.display_uri_string),
                          encodeURIComponent(I.buffer.document.title),
                          encodeURIComponent(I.buffer.top_frame.getSelection()),
                          I.window);
          });
// capture with C-c =, same as in emacs
define_key(content_buffer_normal_keymap, "C-c =", "org-capture");


function org_store_link (url, title, window) {
    var cmd_str = 'emacsclient \"org-protocol://store-link://'+url+'/'+title+'\"';
    if (window != null) {
      window.minibuffer.message('Issuing ' + cmd_str);
    }
    shell_command_blind('ecn ~/org/bookmarks.org');
    shell_command_blind(cmd_str);
}

interactive("org-store-link", "Stores [[url][title]] as org link and copies url to emacs kill ring",
          function (I) {
              org_store_link(encodeURIComponent(I.buffer.display_uri_string), encodeURIComponent(I.buffer.document.title), I.window);
          });

define_key(content_buffer_normal_keymap, "C-c l", "org-store-link");
