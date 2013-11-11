// Time-stamp: " "

dumpln("70interval-reload");

interactive("interval-reload", "Reload current buffer every n minutes", function (I) {
    var b        = I.buffer;
    var interval = yield I.minibuffer.read($prompt="Interval?");

    var ref = call_at_interval(function () {
                  reload(b);
              }, parseInt(interval) * 60 * 1000);

    add_hook.call(b, "kill_buffer_hook", function() {
        ref.cancel();
    });
});
