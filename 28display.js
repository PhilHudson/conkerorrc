// Time-stamp: "2013-11-11 09:50:11 phil"

dumpln("28display");

require("io");
require("spawn-process");
require("interactive");

const LEFT_DISPLAY_HP = "1440 900";
const LEFT_DISPLAY_DELL = "1200 1920";

var width_by_height = LEFT_DISPLAY_HP;

interactive(
    "left_display",
    "Position window on left display.",
    function(I) {
        if ( width_by_height == "" || I.prefix_argument ) {
            I.window.minibuffer.message("Querying display layout...");
            var error = "";
            width_by_height = "";
            var result = yield shell_command(
                "left-display",
                $fds = [
                    {
                        output:
                        async_binary_string_writer("")
                    },
                    {
                        input:
                        async_binary_reader(
                            function (s) {
                                width_by_height += s || "";
                            }
                        )
                    },
                    {
                        input:
                        async_binary_reader(
                            function (s) {
                                error += s || "";
                            }
                        )
                    }
                ]
            );
            if (result != 0 ) {
                throw new interactive_error("status " + result + ", " + error);
            }
            width_by_height = width_by_height.trim();
            I.window.minibuffer.message("Querying display layout...done");
        }
        if ( width_by_height == LEFT_DISPLAY_HP ) {
            I.window.screenX=-1440;
            I.window.screenY=0;
            I.window.innerWidth=1440;
            I.window.innerHeight=878;
        } else {
            I.window.screenX=-1200;
            I.window.screenY=-870;
            I.window.innerWidth=1200;
            I.window.innerHeight=1898;
        }
    }
    );
