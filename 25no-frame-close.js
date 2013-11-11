// Time-stamp: "2010-09-19 22:23:09 phil"

dumpln("25no-frame-close");

add_hook("window_before_close_hook",
         function () {
             var w = get_recent_conkeror_window();
             var result = (w == null) ||
                 "y" == (yield w.minibuffer.read_single_character_option(
                     $prompt = "Quit Conkeror? (y/n)",
                     $options = ["y", "n"]));
             yield co_return(result);
         });
