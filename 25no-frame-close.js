// Time-stamp: "2014-11-12 20:30:44 phil"

dumpln("25no-frame-close");

// TODO Update wiki Tips page accordingly
add_hook("window_before_close_hook",
         function () {
             const w = get_recent_conkeror_window();
             const result = (w == null) ||
                 "y" == (yield w.minibuffer.read_single_character_option(
                     $prompt = (ph_count_conkeror_windows() == 1) ?
                         "Quit Conkeror? (y/n)" : "Close frame? (y/n)",
                     $options = ["y", "n"]));
             yield co_return(result);
         });
