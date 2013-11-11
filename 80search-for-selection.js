// 80search-for-selection.js

dumpln("80search-for-selection");

// select text and google it.  See also "**c" for selecting text
interactive("search-clipboard-contents", 
            "Search in Google the content of the X clipboard (the selected text)",
            "find-url",
            $browser_object=
            function(I) {
                return "g "+ read_from_x_primary_selection();
            }
           );
interactive("search-clipboard-contents-doublequoted",
            "Search in Google the content of the X clipboard (the selected text) as a fixed string",
            "find-url",
            $browser_object=
            function(I) {
                return "g \""+ read_from_x_primary_selection()+"\"";
            }
           );
define_key(content_buffer_normal_keymap, "C-c y", "search-clipboard-contents");
define_key(content_buffer_normal_keymap, "C-c Y", "search-clipboard-contents-doublequoted");

