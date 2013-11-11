// Time-stamp: "2013-10-13 16:53:16 phil"

dumpln("90extensions");

// DOM Inspector
try { require("dom-inspector"); } catch (e) {}

// MozREPL
user_pref('extensions.mozrepl.autoStart', true);

let (mozrepl_init = get_home_directory()) {
    mozrepl_init.appendRelativePath(".mozrepl-conkeror.js");
    session_pref('extensions.mozrepl.initUrl', make_uri(mozrepl_init).spec);
};

interactive("start_mozrepl",
            "Start the mozrepl.",
            function(I) {
                if ('@hyperstruct.net/mozlab/mozrepl;1' in Cc) {
                    let mozrepl = Cc['@hyperstruct.net/mozlab/mozrepl;1']
                        .getService(Ci.nsIMozRepl);
                    if (! mozrepl.isActive()) {
                        let mozrepl_port = (yield I.minibuffer.read(
                                                $prompt = "port [4242]: "));
                        if (mozrepl_port == "") {
                            mozrepl_port = 4242;
                        }
                        mozrepl.start(mozrepl_port);
                    }
                }
            }
           );

// NoScript
try { require("noscript"); } catch (e) {}

// Venkman
try { require("venkman"); } catch (e) {}

// HTTPS Everywhere
if ('@eff.org/https-everywhere;1' in Cc) {
    interactive("https-everywhere-options-dialog",
                "Open the HTTPS Everywhere options dialog.",
                function (I) {
                    window_watcher.openWindow(
                        null, "chrome://https-everywhere/content/preferences.xul",
                        "", "chrome,titlebar,toolbar,centerscreen,resizable", null);
                });
}
