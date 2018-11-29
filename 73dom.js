// Time-stamp: "2018-05-04 23:45:48 phil"
// Section 7x is for Conkeror internal tweaks (?)
dumpln("73dom");

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
// So '* p c' will copy the title of the current buffer

// Examine element properties and style.
interactive("examine-element",
            "Examine the attributes and style of a DOM node.",
            function print_attribute (I) {
                const element = yield read_browser_object(I);
                const list = [];
                const style = I.window.getComputedStyle(element);
                const attributes = element.attributes;
                var name = element.tagName.toLowerCase();

                if (element.id) {
                    name += "#" + element.id;
                }

                for (i = 0 ; i < element.classList.length ; i += 1) {
                    name += "." + element.classList.item(i);
                }

                for (i = 0 ; i < style.length ; i += 1) {
                    list.push([style.item(i), 1]);
                }

                for (i = 0 ; i < attributes.length ; i += 1) {
                    list.push([attributes.item(i).name, 2]);
                }

                yield I.minibuffer.read(
                    $prompt = name + ":",
                    $completer = new prefix_completer(
                        $completions = list.sort(),
                        $get_string = function(item) item[0],
                        $get_description = function(item) {
                            var s;
                            var value;

                            switch(item[1]) {
                            case 1:
                                s = "CSS property";
                                value = style.getPropertyValue(item[0]);

                                break;

                            case 2:
                                s = "Attribute";
                                value = element.getAttribute(item[0]);

                                break;
                            }

                            if (value) {
                                s += " with value " + value;
                            }

                            return s;
                        }),
                    $auto_complete = true,
                    $auto_complete_initial = true,
                    $auto_complete_delay = 0,
                    $require_match = false);
            },
            $browser_object = browser_object_dom_node);

define_key(content_buffer_normal_keymap, "@", "examine-element");
