// Time-stamp: "2013-10-06 17:05:53 phil"

dumpln("11protocol-handlers");

// magnet -> deluge
set_protocol_handler("magnet", find_file_in_path("deluge"));

// mailto -> GMail
set_protocol_handler("mailto",
                     "https://mail.google.com/mail/?extsrc=mailto&url=%s");
