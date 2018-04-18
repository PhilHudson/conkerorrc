// Time-stamp: "2015-04-17 16:15:28 phil"

dumpln("35gmail");

require("content-buffer.js");


function ph_gmail_click_command (selector, error_message) {
    return function (I) {
        var buf = I.buffer;
        var elem = buf.document.querySelector(selector);
        if (elem) {
            dom_node_click(elem, 1, 1);
        } else {
            I.minibuffer.message(error_message);
        }
    };
}

interactive("ph-gmail-spam",
    "Click the GMail \"Spam\" button.",
    ph_gmail_click_command("div[id=\":gy\"]",
                              "No \"Spam\" button found"));

interactive("ph-gmail-delete-forever",
    "Click the GMail \"Delete forever\" button.",
    ph_gmail_click_command("div[class=\"T-I J-J5-Ji aFi T-I-ax7 ar7\"]",
                              "No \"Delete forever\" button found"));

interactive("ph-gmail-not-spam",
    "Click the GMail \"Not spam\" button.",
    ph_gmail_click_command("div[class=\"T-I J-J5-Ji aFk T-I-ax7 T-I-Js-IF ar7\"]",
                              "No \"Not spam\" button found"));

call_after_load("gmail", function () {
    define_key(gmail_keymap, "C-c s", "ph-gmail-spam");
    define_key(gmail_keymap, "C-c d", "ph-gmail-delete-forever");
    define_key(gmail_keymap, "C-c n", "ph-gmail-not-spam");
    define_key(gmail_keymap, "C-return", null, $fallthrough);
});
