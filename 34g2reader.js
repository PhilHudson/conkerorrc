// Time-stamp: "2013-10-13 04:21:47 phil"

dumpln("34g2reader");

require("content-buffer.js");

define_keymap("g2reader_keymap", $display_name = "g2reader");

// Site's own keybindings
define_key(g2reader_keymap, "j", null, $fallthrough);
define_key(g2reader_keymap, "k", null, $fallthrough);
define_key(g2reader_keymap, "n", null, $fallthrough);
define_key(g2reader_keymap, "p", null, $fallthrough);
define_key(g2reader_keymap, "o", null, $fallthrough);
define_key(g2reader_keymap, "s", null, $fallthrough);
define_key(g2reader_keymap, "A", null, $fallthrough);
define_key(g2reader_keymap, "a", null, $fallthrough);
define_key(g2reader_keymap, "q", null, $fallthrough);
define_key(g2reader_keymap, "m", null, $fallthrough);
define_key(g2reader_keymap, "r", null, $fallthrough);
define_key(g2reader_keymap, "v", null, $fallthrough);
define_key(g2reader_keymap, "1", null, $fallthrough);
define_key(g2reader_keymap, "2", null, $fallthrough);
define_key(g2reader_keymap, "return", null, $fallthrough);

define_keymaps_page_mode("g2reader-mode",
    build_url_regexp($domain = "g2reader",
                     $allow_www = true),
    { normal: g2reader_keymap },
    $display_name = "G2Reader");

// Service for subscribing to a feed:
//http://www.g2reader.com/su?u=www.salon.com
// TODO Create a command for this.

page_mode_activate(g2reader_mode);
