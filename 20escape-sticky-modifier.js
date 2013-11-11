// Time-stamp: "2010-09-11 11:01:52 phil"

dumpln("20escape-stick-modifiers");

/*
A sticky modifier is a prefix key that acts as a modifier for the next key.
People commonly define their escape key to be a sticky meta key, so instead of
holding down meta while pressing a key, they can press escape, then the key.
Sticky modifier support is provided by the global-overlay-keymap module.
*/
require("global-overlay-keymap.js");
define_sticky_modifier("escape", "M");
