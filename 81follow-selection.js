// 81follow-selection.js

dumpln("81follow-selection");

// select text and find it (analogous to 'g').
// See also "**c" for selecting text
interactive("find-clipboard-contents",
            "Find the content of the X clipboard (the selected text)",
            "find-url",
            $browser_object=
            function(I) {
                return ""+ read_from_x_primary_selection();
            }
           );
interactive("find-clipboard-contents-doublequoted",
            "Find the content of the X clipboard (the"
            + " selected text) as a fixed string",
            "find-url",
            $browser_object=
            function(I) {
                return "\""+ read_from_x_primary_selection()+"\"";
            }
           );
define_key(content_buffer_normal_keymap, "o", "find-clipboard-contents");
define_key(content_buffer_normal_keymap, "O", "find-clipboard-contents-doublequoted");

// select text which comprises an un-linkified URL and follow it (analogous to 'f').
// See also "**c" for selecting text
interactive("follow-clipboard-contents-url",
            "Follow the URL consisting of the content of the X clipboard (the selected text)",
            "follow",
            $browser_object=
            function(I) {
                return ""+ read_from_x_primary_selection();
            }
           );
interactive("follow-clipboard-contents-doublequoted-url",
            "Follow the URL consisting of the content of the X clipboard (the selected text) as a fixed string",
            "follow",
            $browser_object=
            function(I) {
                return "\""+ read_from_x_primary_selection()+"\"";
            }
           );
define_key(content_buffer_normal_keymap, "j", "follow-clipboard-contents-url");
define_key(content_buffer_normal_keymap, "J", "follow-clipboard-contents-doublequoted-url");
