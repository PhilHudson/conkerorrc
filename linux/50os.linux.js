// Time-stamp: "2019-01-27 00:55:30 phil"

dumpln("50os.linux");

content_handlers.set("application/pdf", content_handler_save);

external_content_handlers.set("image/*", "xdg-open");
external_content_handlers.set("video/*", "yd2tv");
external_content_handlers.set("audio/*", "yd2tv");
external_content_handlers.set("application/octet-stream", "yd2tv");
external_content_handlers.set("application/pdf", "xdg-open");
external_content_handlers.set("application/postscript", "xdg-open");
external_content_handlers.set("application/x-dvi", "xdg-open");
