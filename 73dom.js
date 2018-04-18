// Time-stamp: "2015-10-19 12:00:30 phil"
// Section 7x is for Conkeror internal tweaks (?)
dumpln("73theme");

interactive("delete-all-but",
    "Delete all body elements except for a given DOM node.",
    function (I) {
        const elem = yield read_browser_object(I);
        if (! (elem instanceof Ci.nsIDOMNode)) {
            throw interactive_error("Cannot delete item");
        }
        const body = I.buffer.document.getElementsByTagName("BODY")[0];
        while (body.firstChild) {
            body.removeChild(body.firstChild);
        }
        body.appendChild(elem);
    },
    $browser_object = browser_object_dom_node);

define_browser_object_class(
    "page-title", "Get the title of the current page",
    function (I, prompt) {
        check_buffer(I.buffer, content_buffer);
        yield co_return(I.buffer.document.title);
    });

define_key(content_buffer_normal_keymap, "* p", "browser-object-page-title");
// So * g p will copy the title of the current buffer
