// Time-stamp: "2014-01-27 14:10:52 phil"
// Section 2x is for Conkeror UI tweaks (?)
dumpln("20escape-stick-modifiers");

/*
A sticky modifier is a prefix key that acts as a modifier for the next key.
People commonly define their escape key to be a sticky meta key, so instead of
holding down meta while pressing a key, they can press escape, then the key.
Sticky modifier support is provided by the global-overlay-keymap module.
*/
require("global-overlay-keymap.js");
define_sticky_modifier("escape", "M");
