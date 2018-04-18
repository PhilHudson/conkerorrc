// 27minibuffer.js
// Time-stamp: "2016-10-31 08:30:57 phil"

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

clock_time_format="%y-%m-%d%a%R";

// Modify the code from modules/mode-line.js
clock_widget.prototype.update = function () {
    var time = new Date();
    var formattedTime = time.toLocaleFormat(clock_time_format);
    this.view.text =
        formattedTime.replace(/\D{3}/,
                              function abbrevToTwoCharDay(threeCharDay) {
                                  return threeCharDay.slice(0, 2);
                              }
                             );
    if (time.getSeconds() > 0 || time.getMilliseconds() > 100) {
        this.window.clearTimeout(this.timer_ID);
        var time = time.getSeconds() * 1000 + time.getMilliseconds();
        time = 60000 - time;
        this.timer_ID = this.window.setTimeout(this.do_update, time);
        this.timer_timeout = true;
    } else if (this.timer_timeout) {
        this.window.clearTimeout(this.timer_ID);
        this.timer_ID = this.window.setInterval(this.do_update, 60000);
        this.timer_timeout = false;
    }
};
