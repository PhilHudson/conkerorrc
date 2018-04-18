// Time-stamp: "2016-03-27 11:03:50 phil"

dumpln("14useragent");

require("user-agent-policy");

// Tell Google Calendar that we are Firefox not Conkeror:
user_agent_policy.define_policy(
    "GCal",
    user_agent_firefox(),
    build_url_regexp($domain = /(.*\.)?google/, $path = /calendar/)
);

user_agent_policy.define_policy(
    "AReader",
    user_agent_firefox(),
    "read.amazon.com"
    );
