// Time-stamp: "2013-05-12 11:53:15 phil"


dumpln("12proxies");

// Set the proxy server for this session only.
// WARNING Do NOT use "http://" prefix!
proxy_server_default = "192.168.1.3";
proxy_port_default = 3128;

function set_proxy_session (window, server, port) {
    var msg = "PROGRAMMER FLOW CONTROL ANALYSIS WRONG";
    if (server == "N") {
       session_pref('network.proxy.type', 0); //direct connection
       msg = "Direct connection to the internet enabled for this session";
    } else {
      if (server == "") server = proxy_server_default;
      if (port == "") port = proxy_port_default;

      session_pref('network.proxy.ftp',    server);
      session_pref('network.proxy.gopher', server);
      session_pref('network.proxy.http',   server);
      session_pref('network.proxy.socks',  server);
      session_pref('network.proxy.ssl',    server);

      session_pref('network.proxy.ftp_port',    port);
      session_pref('network.proxy.gopher_port', port);
      session_pref('network.proxy.http_port',   port);
      session_pref('network.proxy.socks_port',  port);
      session_pref('network.proxy.ssl_port',    port);

      session_pref('network.proxy.share_proxy_settings', true);
      session_pref('network.proxy.type', 1);

      msg = "All protocols using " + server + ":" + port + " for this session";
   }
   if (window != null) {
       window.minibuffer.message(msg);
   }
}

interactive("set-proxy-session",
    "set the proxy server for all protocols for this session only",
    function (I) {
        set_proxy_session(
            I.window,
            (yield I.minibuffer.read($prompt = "server [" +
                                     proxy_server_default + "] or N: ")),
            (yield I.minibuffer.read($prompt = "port [" + proxy_port_default +
                                     "]: ")));
    });

function proxy_session_off () {
    set_proxy_session(null, "N", null);
}

function proxy_session_on () {
    set_proxy_session(null, proxy_server_default, proxy_port_default);
}
