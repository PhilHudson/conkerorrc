// Time-stamp: "2018-04-28 10:58:08 phil"
// Section 0x is for common (global) settings (?)

/*
 * When debugging your rc file remember you can use the dumpln function to print
   arbitrary strings. Also remember that if you execute conkeror from a command
   line, it will show you any syntax or other errors in your rc file.
 */

dumpln("00common");

// Add .conkerorrc/modules/ to load_path before anything else
var ph_modules_directory=get_home_directory().clone();
ph_modules_directory.appendRelativePath(".conkerorrc");
ph_modules_directory.appendRelativePath("modules");
// "unshift" means "push" wtf
load_paths.unshift(make_uri(ph_modules_directory).spec);

//
// Utilities
//

// function shell_command_output (command) {
//     var error_text = "";
//     var output_text = "";
//     var exit_status = shell_command(
//         command,
//         $fds = [
//             {
//                 output:
//                 async_binary_string_writer("")
//             },
//             {
//                 input:
//                 async_binary_reader(
//                     function (s) {
//                         output_text += s || "";
//                     }
//                 )
//             },
//             {
//                 input:
//                 async_binary_reader(
//                     function (s) {
//                         error_text += s || "";
//                     }
//                 )
//             }
//         ]
//     );
//     if (exit_status != 0 ) {
//         throw new Error("exit_status: " + exit_status + ", error_text: " +
//                         error_text);
//     }
//     return output_text.trim();
// }

function wordwrap(str, int_width, str_break, cut) {
  //  discuss at: http://phpjs.org/functions/wordwrap/
  // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // improved by: Nick Callen
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Sakimori
  //  revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // bugfixed by: Michael Grier
  // bugfixed by: Feras ALHAEK
  //   example 1: wordwrap('Kevin van Zonneveld', 6, '|', true);
  //   returns 1: 'Kevin |van |Zonnev|eld'
  //   example 2: wordwrap('The quick brown fox jumped over the lazy dog.', 20, '<br />\n');
  //   returns 2: 'The quick brown fox <br />\njumped over the lazy<br />\n dog.'
  //   example 3: wordwrap('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
  //   returns 3: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod \ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim \nveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea \ncommodo consequat.'

  var m = ((arguments.length >= 2) ? arguments[1] : 75);
  var b = ((arguments.length >= 3) ? arguments[2] : '\n');
  var c = ((arguments.length >= 4) ? arguments[3] : false);

  var i, j, l, s, r;

  str += '';

  if (m < 1) {
    return str;
  }

  for (i = -1, l = (r = str.split(/\r\n|\n|\r/))
    .length; ++i < l; r[i] += s) {
    for (s = r[i], r[i] = ''; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j))
        .length ? b : '')) {
      j = c == 2 || (j = s.slice(0, m + 1)
        .match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length || c == 1 && m || j.input.length + (j = s.slice(
          m)
        .match(/^\S*/))[0].length;
    }
  }

  return r.join('\n');
}

function ph_where_editors_executable (executable) {
    const path_to_executable = get_home_directory().clone();
    path_to_executable.appendRelativePath("editors");
    path_to_executable.appendRelativePath(executable);
    return path_to_executable.path;
}

function ph_shell_escape (text) {
    return new String(text).
        replace(/'/g, "′"). // PRIME ′. Not RIGHT SINGLE QUOTATION MARK ’.
        replace(/!/g, "¡"). // INVERTED EXCLAMATION MARK
        replace(/\*/g, "⋆"). // STAR OPERATOR ⋆. WHITE SMALL STAR ⭒ or
        // BLACK SMALL STAR ⭑ or SMALL ASTERISK ﹡ or ASTERISK OPERATOR ∗.
        replace(/\(/g, "﹙"). // SMALL LEFT PARENTHESIS ﹙
        replace(/\)/g, "﹚"); // SMALL RIGHT PARENTHESIS ﹚
}

// FIXME See:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter
function ph_shell_escaper(matched_text, offset, whole) {
    var m;

    if (matched_text == "\'") {
        return "’";
    } else if (matched_text == "'") {
        return "’";
    } else if ((m = matched_text.match(/(.)'/))) {
        return m[1] + "’";
    } else {
        return matched_text;
    }
}

// TODO Merge with implementation above
// function ph_shell_escape(string) {
//   return string.replace("\n", " ").replace(/.?'/g, ph_shell_escaper);
// }

// Test:
// ph_shell_escape("http://some.uri.with/pagetitle/containing'character");

function ph_encodeURIComponent (text) {
    return encodeURIComponent(ph_shell_escape(text));
}

/**
 * setenv sets the value of a named environment variable to a given string.
 */
require("env");
let (env = Cc['@mozilla.org/process/environment;1']
         .getService(Ci.nsIEnvironment)) {
    function setenv (variable, value) {
        env.set(variable, value);
    }
}

// Minibuffer message in one line
function ph_safe_message (window, message) {
    (window || get_recent_conkeror_window()).minibuffer.message(message);
}

function ph_X11_activate (window_title_regexp) {
    shell_command_blind(
        "xdotool search --onlyvisible --name '" + window_title_regexp + "'"
            + " windowactivate"
    );
} // TODO Interactive form

function blocking_pause (milliseconds) {
    const dt = new Date();
    while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}

// TODO Verify that there isn't a simpler/standard way to do this
function ph_count_conkeror_windows () {
    var window_count = 0;
    const en = window_watcher.getWindowEnumerator();
    while (en.hasMoreElements()) {
        const ignored = en.getNext();
        window_count++;
    }
    return window_count;
}


interactive("load-file",
           "(Re-)load an initialization file",
           function (I) {
               config_dir = get_home_directory().clone();
               config_dir.appendRelativePath(".conkerorrc");
               filename = (yield I.minibuffer.read($prompt = "Load file: ",
                                                   $initial_value = config_dir.path + "/",
                                                   $history = "load_file"));
               I.window.minibuffer.message("Loaded file "+filename);
               load(make_file(filename));
           }
          );

// The default page for new buffers.
homepage = "about:blank";

// default directory for downloads and shell commands.
cwd = get_home_directory().clone();
cwd.append("Desktop");

// Open the download manager buffer in the current frame, or in a new window
// with universal argument.
download_buffer_automatic_open_target = [OPEN_NEW_BUFFER, OPEN_NEW_WINDOW];

// save a keystroke when selecting a dom node by number.
hints_auto_exit_delay = 500;
hints_ambiguous_auto_exit_delay = 500;

// Open each externally-requested URL in a new buffer
url_remoting_fn = load_url_in_new_buffer;

// Scroll each isearch match to the frame's vertical center, not bottom
isearch_scroll_center_vertically = true;

// User prefs
user_pref("browser.download.manager.closeWhenDone", true);
user_pref("extensions.checkCompatibility", false);

// TODO Move to appropriate files
require("gmail");
require("twitter");
require("duckduckgo");
require("facebook");
require("gmane");
require("google-calendar");
require("google-maps");
require("wikipedia");
require("xkcd");
require("youtube-player");
require("youtube");

// Session manager
require("session.js");
session_auto_save_auto_load = true;
session_auto_save_auto_load_fn = session_auto_save_load_window_current;

// Password manager
session_pref("signon.rememberSignons", false);
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
// Bound to ` above

interactive("duplicate-buffer", "Duplicate buffer",
            function (I) {
              browser_object_follow(I.buffer, OPEN_NEW_BUFFER, I.buffer.current_uri.spec);
            });
define_key(content_buffer_normal_keymap, "C-M-n", "duplicate-buffer");


// FIXME WTF is this buffer_list's ordering?
interactive("switch-to-other-buffer",
            "Switch to the previously open buffer",
            function (I) {
                const blist = I.window.buffers.buffer_list;
                if (blist.length > 1) {
                    switch_to_buffer(I.window, blist[1]);
                }
            });
define_key(content_buffer_normal_keymap, "f8", "switch-to-other-buffer");


// I think by the time kill_buffer_hook runs the buffer is gone so I
// patch kill_buffer

define_key(default_global_keymap, "C-T", "restore-killed-buffer-url");

var kill_buffer_original = kill_buffer_original || kill_buffer;

var killed_buffers = [];

kill_buffer = function (buffer, force) {
    if (buffer.display_uri_string) {
        killed_buffers.push({url: buffer.display_uri_string,
                             title: buffer.title,
                             history: buffer.web_navigation.sessionHistory});
    }

    kill_buffer_original(buffer,force);
};

interactive("restore-killed-buffer-url", "Loads url from a previously killed buffer",
            function restore_killed_buffer_url (I) {
                if (killed_buffers.length !== 0) {
                    var killed_buffer = yield I.minibuffer.read(
                        $prompt = "Restore killed buffer url:",
                        $completer = new all_word_completer($completions = killed_buffers,
                                                            $get_string = function (x) x.url,
                                                            $get_description = function (x) x.title),
                        $default_completion = killed_buffers[killed_buffers.length - 1],
                        $auto_complete = "url",
                        $auto_complete_initial = true,
                        $auto_complete_delay = 0,
                        $require_match = true
                    );

                    load_url_in_new_buffer(killed_buffer.url);

                    var buf = I.window.buffers.current;
                    // TODO Decide whether to assign a copy of the history
                    buf.web_navigation.sessionHistory = killed_buffer.history;
                    var original_index = buf.web_navigation.sessionHistory.index;
                    buf.web_navigation.gotoIndex(original_index);

                } else {
                    I.window.minibuffer.message("No killed buffer urls");
                }
            });

// FIXME Add 'provide'
