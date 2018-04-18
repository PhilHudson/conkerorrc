// Time-stamp: "2017-10-23 16:35:53 phil"
// Section 4x is for inter-application communications tweaks
dumpln("40emacs");

/*
 In emacs, configure conkeror as the external browser:

(setq browse-url-browser-function 'browse-url-generic
      browse-url-generic-program "/path/to/conkeror")
*/

// Avoid blocking from ssh waiting for tty input (passphrase)
setenv("SSH_ASKPASS", "/usr/bin/ssh-askpass");
require("external-editor");
editor_shell_command = "/usr/bin/env SSH_ASKPASS=/usr/bin/ssh-askpass timeout --signal=9 5m " +
    ph_where_editors_executable("ecc");
var emacsclient_executable = "/usr/bin/env SSH_ASKPASS=/usr/bin/ssh-askpass" +
        " timeout --signal=9 5m " + ph_where_editors_executable("emacsclient");

view_source_use_external_editor = true;
// edit-current-field-in-external-editor is on C-i when a text field/area has
// focus


// To make temp files used by external editor end in ".conkeror_field.md":
external_editor_extension_overrides.set("text/plain", "conkeror_field.md");

// Advise `external_editor_make_base_filename' to prefix "conkeror-edit-"
var default_external_editor_make_base_filename =
    (default_external_editor_make_base_filename ||
     external_editor_make_base_filename);
external_editor_make_base_filename = function (elem, top_doc) {
    return "conkeror-edit-" +
        default_external_editor_make_base_filename(elem, top_doc);
};

//  org-remember

function org_remember(url, title, text, window) {
    const eurl = ph_encodeURIComponent(url);
    const etitle = ph_encodeURIComponent(title);
    const etext = ph_encodeURIComponent(text);
    const cmd_str = "org-protocol://remember://" + eurl + "/" + etitle + "/" +
              etext;
    window.minibuffer.message("Issuing " + cmd_str);
    shell_command_blind(emacsclient_executable + " -c '" + shell_quote(cmd_str)
                        + "'");
}

interactive("org-remember", "Remember the current url with org-remember",
                            function (I) {
                            org_remember(I.buffer.display_uri_string,
                                         I.buffer.document.title,
                                         I.buffer.top_frame.getSelection(),
                                         I.window);
                            }
                            );
//define_key(content_buffer_normal_keymap, "C-c r", "org-remember");

// TODO evaluate above's effectiveness; recommended current approach is to
// duplicate org_capture below, replacing 'capture' with 'remember' throughout

// org-protocol stuff
function org_capture (url, title, selection, window) {
    const cmd_str = emacsclient_executable + " 'org-protocol://capture:/w/" + url + '/' + title + '/' + selection + "'";
    // const cmd_str = emacsclient_executable + " 'org-protocol://capture?template=w&url=" + url + '&title=' + title + '&body=' + selection + "'";
    dumpln(cmd_str);
    ph_safe_message(window, 'Issuing ' + cmd_str);
    const result = yield shell_command(cmd_str);
    if (result != 0) {
        throw new interactive_error("status " + result + ' for ' + cmd_str);
    }
    blocking_pause(3000);
    // Raise the Emacs frame
    ph_X11_activate("Minibuf|CAPTURE-");
}

interactive("org-capture", "Clip url, title, and selection to capture via org-protocol",
          function (I) {
              yield org_capture(ph_encodeURIComponent(I.buffer.display_uri_string),
                                ph_encodeURIComponent(I.buffer.document.title),
                                ph_encodeURIComponent(I.buffer.top_frame.getSelection()),
                                I.window);
          });
// capture with C-c t, same as in emacs
define_key(content_buffer_normal_keymap, "C-c t", "org-capture");


function org_store_link (url, title, window) {
    const cmd_str = emacsclient_executable + " 'org-protocol://store-link://" +
            url + '/' + title + "'";
    ph_safe_message(window, 'Issuing ' + cmd_str);
    // TODO log the command to a file
    shell_command_blind(cmd_str);
}

interactive(
    "org-store-link",
    "Stores [[url][title]] as org link and copies url to emacs kill ring",
    function (I) {
        org_store_link(
            ph_encodeURIComponent(I.buffer.display_uri_string),
            ph_encodeURIComponent(I.buffer.document.title),
            I.window
        );
    });

define_key(content_buffer_normal_keymap, "C-c l", "org-store-link");
