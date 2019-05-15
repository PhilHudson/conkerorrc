// Time-stamp: "2018-12-27 20:18:05 phil"

dumpln("15redirects");

require("client-redirect");

var debug_redirects = false;

define_client_redirect("tpb",
    function (uri) {
        if (! /thepiratebay\.se$/.test(uri.host)) {
            return null;
        }
        if (debug_redirects) {
            dumpln("tpb redirect starting");
            dumpln(`uri.spec: ${uri.spec}`);
            dumpln(`uri.host: ${uri.host}`);
            dumpln(`tpb redirect from: ${uri.spec}`);
            dumpln(uri.spec.replace(/thepiratebay.se/, "thepiratebay.org"));
        }
        return uri.spec.replace(/thepiratebay.se/, "thepiratebay.org");
    });

function yd (url) {
    const cmd_str = `yd2tv '${url}'`;
    if (debug_redirects) {
        dumpln(cmd_str);
    }
    ph_safe_message(null, `Issuing ${cmd_str}`);
    shell_command_with_argument_blind("yd2tv '{}'", url);
}

define_client_redirect("yd",
    function (uri) {
        if (! /youtu(be\.com|\.be)$/.test(uri.host)) {
            return null;
        }
        if (debug_redirects) {
            dumpln("yd redirect starting");
            dumpln(`uri.spec: ${uri.spec}`);
            dumpln(`uri.host: ${uri.host}`);
            dumpln(`yd redirect from: ${uri.spec}`);
        }
        yd(uri.spec);
        return "about:blank";
    });

function open_in_chromium (url) {
    const cmd_str = `chromium '${url}'`;
    if (debug_redirects) {
        dumpln(cmd_str);
    }
    ph_safe_message(null, `Issuing ${cmd_str}`);
    const result = yield shell_command_with_argument("chromium '{}'", url);
    if (result != 0) {
        throw new interactive_error(`status ${result} for ${cmd_str}`);
    }
    blocking_pause(3000);
    // Raise the Chromium frame
    ph_X11_activate(" - Chromium");
}

interactive("open-in-chromium", "Open URL in Chromium",
          function (I) {
              yield open_in_chromium(ph_encodeURIComponent(I.buffer.display_uri_string),
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
                dumpln(`uri.spec: ${uri.spec}`);
                dumpln(`uri.host: ${uri.host}`);
                dumpln(`${name} redirect from: ${uri.spec}`);
            }
            open_in_chromium(uri.spec);
            return "about:blank";
        });
}

define_chromium_redirect("ticketsolve", /ticketsolve\.com/);

define_chromium_redirect("ee_topup", /myaccount\.ee\.co\.uk/);
