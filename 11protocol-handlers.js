// Time-stamp: "2017-08-27 17:02:22 phil"

dumpln("11protocol-handlers");

// magnet -> deluge
// set_protocol_handler("magnet", find_file_in_path("deluge-gtk"));
set_protocol_handler("magnet", find_file_in_path("magnet"));
// set_protocol_handler("magnet", make_file("~/bin/deluge-console"));

// mailto -> GMail
set_protocol_handler("mailto",
                    "https://mail.google.com/mail/?extsrc=mailto&url=%s");

// mailto -> Emacs
// set_protocol_handler("mailto", make_file("~/bin/emacs-utils/handle-mailto-in-Emacs"));

// git -> git clone
set_protocol_handler("git", make_file("~/bin/git-uri-clone"));

external_content_handlers.set("video/*", "vlc");
external_content_handlers.set("application/pdf", "acroread");
