// Time-stamp: "2015-04-21 23:58:36 phil"

dumpln("24big-hints");

register_user_stylesheet(
    "data:text/css," +
        escape(
            "@namespace url(\"http://www.w3.org/1999/xhtml\");\n" +
            "span.__conkeror_hint {\n"+
            "  font-size: 14px !important;\n"+
            "  line-height: 14px !important;\n"+
            "}"));

// Color:
// register_user_stylesheet(make_css_data_uri(["span.__conkeror_hint {
//background-color: #CHANGEME !important; }"]));
