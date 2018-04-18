// Time-stamp: "2015-04-05 16:06:33 phil"
// Section 9x is for extension-specific tweaks
dumpln("90extensions");

// // DOM Inspector
// user_pref("conkeror.load.extensions/dom-inspector", 1);
// try { require("dom-inspector"); } catch (e) {}

// // NoScript
// user_pref("conkeror.load.extensions/noscript", 1);
// try { require("noscript"); } catch (e) {}

// // Venkman
// try { require("venkman"); } catch (e) {}

// // HTTPS Everywhere
// if ('@eff.org/https-everywhere;1' in Cc) {
//     interactive("https-everywhere-options-dialog",
//                 "Open the HTTPS Everywhere options dialog.",
//                 function (I) {
//                     window_watcher.openWindow(
//                         null, "chrome://https-everywhere/content/preferences.xul",
//                         "", "chrome,titlebar,toolbar,centerscreen,resizable", null);
//                 });
// }
