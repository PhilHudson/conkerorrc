// 81follow-selection.js

dumpln("81follow-selection");

// select text which comprises an un-linkified URL and follow it.  
// See also "**c" for selecting text
interactive("follow-clipboard-contents", 
            "Follow the content of the X clipboard (the selected text)",
            "find-url",
            $browser_object=
            function(I) {
                return ""+ read_from_x_primary_selection();
            }
           );
interactive("follow-clipboard-contents-doublequoted",
            "Follow the content of the X clipboard (the selected text) as a fixed string",
            "find-url",
            $browser_object=
            function(I) {
                return "\""+ read_from_x_primary_selection()+"\"";
            }
           );
define_key(content_buffer_normal_keymap, "o", "follow-clipboard-contents");
define_key(content_buffer_normal_keymap, "O", "follow-clipboard-contents-doublequoted");

