// Time-stamp: "2015-03-25 17:15:00 phil"
// Section 9x is for extension-specific tweaks
dumpln("91mozrepl");

user_pref('extensions.mozrepl.autoStart', true);

// WARNING: Comment this out if you're using the Bash library from
// https://github.com/PhilHudson/bash-mozrepl
let (mozrepl_init = get_home_directory().clone()) {
    mozrepl_init.appendRelativePath(".mozrepl-conkeror.js");
    session_pref('extensions.mozrepl.initUrl', make_uri(mozrepl_init).spec);
};

interactive("start_mozrepl",
            "Start the mozrepl.",
            function (I) {
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
