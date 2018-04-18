// Time-stamp: "2018-02-27 03:14:39 phil"

dumpln("15redirects");

require("client-redirect");

var debug_redirects = false;

define_client_redirect("tpb",
    function (uri) {
        if (! /thepiratebay\.se/.test(uri.host)) {
            return null;
        }
        if (debug_redirects) {
            dumpln("tpb redirect starting");
            dumpln("uri.spec: " + uri.spec);
            dumpln("uri.host: " + uri.host);
            dumpln("tpb redirect from: " + uri.spec);
            dumpln(uri.spec.replace(/thepiratebay.se/, "thepiratebay.org"));
        }
        return uri.spec.replace(/thepiratebay.se/, "thepiratebay.org");
    });

function open_in_chromium (url, window) {
    const cmd_str = "chromium '" + url + "'";
    if (debug_redirects) {
        dumpln(cmd_str);
    }
    ph_safe_message(window, 'Issuing ' + cmd_str);
    const result = yield shell_command(cmd_str);
    if (result != 0) {
        throw new interactive_error("status " + result + ' for ' + cmd_str);
    }
    blocking_pause(3000);
    // Raise the Chromium frame
    ph_X11_activate(" - Chromium");
}

interactive("open-in-chromium", "Open URL in Chromium",
          function (I) {
              yield org_capture(ph_encodeURIComponent(I.buffer.display_uri_string),
                                I.window);
          });
// Browse in Chromium with C-c c
define_key(content_buffer_normal_keymap, "C-c c", "open-in-chromium");


// "Dummy" redirect that actually opens the URL in Chromium
function define_chromium_redirect(name, regexp) {
    define_client_redirect(name,
        function (uri) {
            if (! regexp.test(uri.host)) {
                return null;
            }
            if (debug_redirects) {
                dumpln(name + " redirect starting");
                dumpln("uri.spec: " + uri.spec);
                dumpln("uri.host: " + uri.host);
                dumpln(name + " redirect from: " + uri.spec);
            }
            // FIXME How do I get the Conkeror window object here?
            open_in_chromium(uri.spec, null);
            return null;
        });
}

define_chromium_redirect("ticketsolve", /ticketsolve\.com/);

define_chromium_redirect("ee_topup", /myaccount\.ee\.co\.uk/);
