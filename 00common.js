// Time-stamp: "2013-10-13 16:53:01 phil"


/*
 * When debugging your rc file remember you can use the dumpln function to print
   arbitrary strings. Also remember that if you execute conkeror from a command
   line, it will show you any syntax or other errors in your rc file.
 */

dumpln("00common");

interactive("load-file",
           "(Re-)load an initialization file",
           function(I) {
               config_dir= get_home_directory();
               config_dir.appendRelativePath(".conkerorrc");
               filename= (yield I.minibuffer.read($prompt = "Load file: ",
                                                  $initial_value = config_dir.path + "/",
                                                  $history = "load_file"));
               I.window.minibuffer.message("Loaded file "+filename);
               load(make_file(filename));
           }
          );

// The default page for new buffers.
homepage = "about:blank";

// default directory for downloads and shell commands.
cwd = get_home_directory();
cwd.append("Desktop");

// Open the download manager buffer in the current frame, or in a new window
// with universal argument.
download_buffer_automatic_open_target = [OPEN_NEW_BUFFER, OPEN_NEW_WINDOW];

// save a keystroke when selecting a dom node by number.
hints_auto_exit_delay = 500;
hints_ambiguous_auto_exit_delay = 500;

url_remoting_fn = load_url_in_new_buffer;

// User prefs
user_pref("browser.download.manager.closeWhenDone", true);
user_pref("extensions.checkCompatibility", false);
user_pref("conkeror.load.extensions/noscript", 1);
user_pref("conkeror.load.extensions/dom-inspector", 1);

require("gmail");
require("github");
require("twitter");
require("duckduckgo");
require("facebook");
require("gmane");
require("google-calendar");
require("google-maps");
require("stackexchange");
require("wikipedia");
require("xkcd");
require("youtube-player");
require("youtube");

// Session manager
require("session.js");
session_auto_save_auto_load = true;
session_auto_save_auto_load_fn = session_auto_save_load_window_current;

// Password manager
session_pref("signon.rememberSignons", true);
session_pref("signon.expireMasterPassword", false);
session_pref("signon.SignonFileName", "signons.txt");

Components.classes["@mozilla.org/login-manager;1"].getService(Components.interfaces.nsILoginManager);

define_key(content_buffer_normal_keymap, "`", "follow-new-buffer-background");


// The javascript code to clear the startup-cache is as follows:

/*
   var obs = Cc["@mozilla.org/observer-service;1"]
       .getService(Ci.nsIObserverService);
   obs.notifyObservers(null, "startupcache-invalidate", null);
*/

// TODO You can put this in a command or a function for easy access.


// Make fnbb an alias for follow-new-buffer-background
interactive("fnbb",
    "Follow a link in a new buffer in the background",
    alternates(follow_new_buffer_background, follow_new_window),
    $browser_object = browser_object_links,
    $prompt = "Follow");
