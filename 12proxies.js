// Time-stamp: "2016-11-18 17:07:17 phil"

dumpln("12proxies");

require("env.js");

// FIXME
//var ph_host_name = getenv("HOST") || getenv("HOSTNAME") ||
//        shell_command_output("hostname") || "";
var ph_host_name = getenv("HOST") || getenv("HOSTNAME") || "";

// Set the proxy server for this session only.
// WARNING Do NOT use "http://" prefix!
const proxy_server_default = ph_host_name.match(/quiz/) ? "127.0.0.1" :
          "192.168.1.3";
const proxy_port_default = 3128;
const proxyable_protocols = [ "ftp", "gopher", "http", "socks", "ssl" ];

function set_proxy_session (window, server, port) {
    var msg = "PROGRAMMER HEADSPACE ERROR: FLOW CONTROL ANALYSIS WRONG. DOOFUS.";
    if (server == "N") {
        session_pref('network.proxy.type', 0); //direct connection
        msg = "Direct connection to the internet enabled for this session";
    } else {
        if (server == "") {
            server = proxy_server_default;
        }
        if (typeof port == 'string' || port instanceof String) {
            if (port == "") {
                port = proxy_port_default;
            } else {
                port = Number(port);
            }
        }

        for (let protocol of proxyable_protocols) {
            session_pref('network.proxy.' + protocol, server);
            session_pref('network.proxy.' + protocol + '_port', port);
        }

        session_pref('network.proxy.share_proxy_settings', true);
        session_pref('network.proxy.type', 1);

        msg = "All protocols using " + server + ":" + port + " for this session";
   }
   ph_safe_message(window, msg);
}

interactive("set-proxy-session",
    "Set the proxy server for all protocols for this session only",
    function (I) {
        set_proxy_session(
            I.window,
            (yield I.minibuffer.read(
                $prompt = "server [" + proxy_server_default + "] or N: ",
                $initial_value = proxy_server_default,
                $select)),
            (yield I.minibuffer.read(
                $prompt = "port [" + proxy_port_default + "]: ",
                $initial_value = String(proxy_port_default),
                $select))
        );
    });

function proxy_session_off () {
    set_proxy_session(null, "N", null);
}

function proxy_session_on () {
    set_proxy_session(null, proxy_server_default, proxy_port_default);
}
