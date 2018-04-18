// Time-stamp: "2018-04-14 21:07:05 phil"

dumpln("50os.linux");

content_handlers.set("application/pdf", content_handler_save);

external_content_handlers.set("image/*", "xdg-open");
external_content_handlers.set("video/*", "xdg-open");
external_content_handlers.set("audio/*", "xdg-open");
external_content_handlers.set("application/pdf", "xdg-open");
external_content_handlers.set("application/postscript", "xdg-open");
external_content_handlers.set("application/x-dvi", "xdg-open");
