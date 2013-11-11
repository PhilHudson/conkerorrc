// Time-stamp: "2010-09-11 11:02:07 phil"

dumpln("21scrollbar");

// Disable scrollbars
// MESSES UP ISEARCH
function disable_scrollbars (buffer) {
    buffer.browser.contentWindow.scrollbars.visible = false;
}
//add_hook ("content_buffer_location_change_hook", disable_scrollbars);
