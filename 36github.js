// Time-stamp: "2015-04-10 18:42:02 phil"

dumpln("36github");

require("github");

// From http://ericjmritz.name/2013/07/19/cloning-from-github-with-one-key-in-conkeror
interactive("github-clone-current-buffer-url", null,
  function (I) {
    const meta = I.buffer.document.querySelector("meta[property='og:url']");
    if (meta) {
      const uri = meta.getAttribute("content").toString();
      yield shell_command_with_argument(make_file("~/bin/git-uri-clone").path +
                                        " '{}'", uri);
      I.minibuffer.message("Cloned " + uri);
    }
    else {
      I.minibuffer.message("Cannot find URL to clone");
    }
  }
);

define_key(github_keymap, "C", "github-clone-current-buffer-url");
