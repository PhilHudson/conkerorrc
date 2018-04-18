// Time-stamp: "2016-07-08 09:52:41 phil"

dumpln("50global_keys");

require("text.js");

function ph_insert_char (field, char) {
    modify_region(field, function() {return char;});
}
function insert_pound_sterling(field) {
    ph_insert_char(field, "\u{000A3}");
}
interactive("insert-pound-sterling", "Insert '£'.",
    function (I) {
        call_on_focused_field(I, insert_pound_sterling, true);
    });

define_key(text_keymap, "C-x 8 l", "insert-pound-sterling");

provide("50global_keys");
