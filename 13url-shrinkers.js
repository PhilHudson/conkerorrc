// Time-stamp: "2014-11-12 20:22:23 phil"

dumpln("13url-shrinkers");

// last updated September 22, 2009
define_browser_object_class(
    "tinyurl", "Get a tinyurl for the current page",
    function (I, prompt) {
        check_buffer(I.buffer, content_buffer);
        const createurl = 'http://tinyurl.com/api-create.php?url=' +
            encodeURIComponent(
                load_spec_uri_string(
                    load_spec(I.buffer.top_frame)));
        try {
            const content = yield send_http_request(
                load_spec({uri: createurl}));
            yield co_return(content.responseText);
        } catch (e) { }
    });

define_key(content_buffer_normal_keymap, "* q", "browser-object-tinyurl");

define_browser_object_class(
    "isgd", "Get an isgd URL for the current page",
    function (I, prompt) {
        check_buffer(I.buffer, content_buffer);
        const createurl = 'http://is.gd/create.php?format=simple&url=' +
            encodeURIComponent(
                load_spec_uri_string(
                    load_spec(I.buffer.top_frame)));
        try {
            const content = yield send_http_request(
                load_spec({uri: createurl}));
            yield co_return(content.responseText);
        } catch (e) { }
    });

define_key(content_buffer_normal_keymap, "* g", "browser-object-isgd");
// So * g c will copy the is.gd URL for the current buffer
