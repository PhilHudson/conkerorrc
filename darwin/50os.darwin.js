// Time-stamp: "2013-06-17 17:22:15 phil"

dumpln("50os.darwin");

content_handlers.set("application/pdf", content_handler_save);

external_content_handlers.set("image/*", "open -W");
external_content_handlers.set("video/*", "open -W");
external_content_handlers.set("audio/*", "open -W");
external_content_handlers.set("application/pdf", "open -W");
external_content_handlers.set("application/postscript", "open -W");
external_content_handlers.set("application/x-dvi", "open -W");


// Option->Meta, Command->Alt
// Requires a no-dead-keys keyboard layout.
modifiers.M = new modifier(function (event) { return event.altKey; },
                           function (event) { event.altKey = true; });
modifiers.A = new modifier(function (event) { return event.metaKey; },
                           function (event) { event.metaKey = true; });


// Zoom 150% by default on Mac
// my_zoom_set is defined in 22default_zoom.js
add_hook('content_buffer_started_loading_hook', my_zoom_set);
add_hook('content_buffer_finished_loading_hook', my_zoom_set);
add_hook('content_buffer_location_change_hook', my_zoom_set);


// Keychain Services Integration extension setup:
session_pref("signon.rememberSignons", true);
session_pref("signon.expireMasterPassword", false);
session_pref("signon.SignonFileName", "signons.txt");
Cc["@mozilla.org/login-manager;1"].getService(Ci.nsILoginManager); // init
