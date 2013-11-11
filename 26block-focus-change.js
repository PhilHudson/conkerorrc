// Time-stamp: " "

dumpln("26block-focus-change");

// Breaks GReader mode wtf
//require("block-content-focus-change.js");

//block_content_focus_change_duration = 40; // default is 20 millis

function focusblock (buffer) {
    var s = Components.utils.Sandbox(buffer.top_frame);
    s.document = buffer.document.wrappedJSObject;
    Components.utils.evalInSandbox(
        "(function () {\
            function nothing () {}\
            if (! document.forms)\
                return;\
            for (var i = 0, nforms = document.forms.length; i < nforms; i++) {\
              for (var j = 0, nels = document.forms[i].elements.length; j < nels; j++)\
                document.forms[i].elements[j].focus = nothing;\
            }\
          })();",
        s);
}
//add_hook('content_buffer_progress_change_hook', focusblock);
