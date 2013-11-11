// 27minibuffer.js
// Time-stamp: "2012-03-25 20:33:30 phil"

dumpln("27minibuffer");

minibuffer_auto_complete_default = true;
url_completion_use_history = true; // should work since bf05c87405
url_completion_use_bookmarks = true;

// To enable fetching of favicons:
require("favicon");

// To enable favicons in the mode-line:
add_hook("mode_line_hook", mode_line_adder(buffer_icon_widget), true);

// To enable favicons in the read_buffer completions list:
read_buffer_show_icons = true;

// To enable download feedback in the mode-line:
add_hook("mode_line_hook", mode_line_adder(downloads_status_widget));

// To enable window buffer count in the mode-line:
add_hook("mode_line_hook", mode_line_adder(buffer_count_widget), true);


// To invoke an alert, enter at a M-: prompt:
//  get_recent_conkeror_window().alert("hello world");
