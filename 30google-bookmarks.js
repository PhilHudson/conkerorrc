// Time-stamp: "2010-09-11 11:03:06 phil"

dumpln("30google-bookmarks");

function elementText(el) {
  var childNodes = el.childNodes;
  var textChild = childNodes[0];
  return textChild.nodeValue;
}

function childElements(el) {
  var result = new Array();
  var childNodes = el.childNodes;
  for (let i = 0; i < childNodes.length; ++i) {
    let child = childNodes[i];
    if (child.nodeType == child.ELEMENT_NODE) {
      result.push(child);
    }
  }
  return result;
}

function searchBookmarks(query) {
//  var bookmarksURL = 'http://www.google.com/bookmarks/find?output=xml&q=' + escape(query);
  var bookmarksURL = 'https://www.google.com/bookmarks/find?output=xml&q=' + escape(query);
  dump("getting bookmarks from: '" + bookmarksURL + "'. ");
  var result = yield getBookmarks(bookmarksURL);
  dump(result.length + " results\n");
  yield co_return( result );
}

function getBookmarks(bookmarksURL) {
  var httpresp = yield send_http_request(load_spec({uri:bookmarksURL}));
  var result = parseBookmarks(httpresp.responseText);
  yield co_return(result);
}

function parseBookmarks(xml){
  var parser = Components.classes["@mozilla.org/xmlextras/domparser;1"].createInstance(Components.interfaces.nsIDOMParser);
  var dom = parser.parseFromString(xml, "text/xml");
  return parseBookmarksDoc(dom.documentElement);
}
function parseBookmarksDoc(doc) {
  var result = new Array();
  var bookmarkels = doc.getElementsByTagName('bookmark');
  for (let i = 0; i < bookmarkels.length; ++i) {
    let bookmarkel = bookmarkels[i];
    result.push(parseBookmarkElement(bookmarkel));
  }
  return result;
}

function parseBookmarkElement(bookmarkel) {
  var title;
  var url;
  var timestamp;
  var id;
  var labels;
  var attributes;
  var children = childElements(bookmarkel);
  for (let i in children) {
    var childel = children[i];
    switch(childel.nodeName) {
    case 'title':
      title = elementText(childel);
      break;
    case 'url':
      url = elementText(childel);
      break;
    case 'timestamp':
      timestamp = elementText(childel);
      break;
    case 'id':
      id = elementText(childel);
      break;
    case 'labels':
      labels = parseListElement(childel,'label');
      break;
    case 'attribute':
      attributes = parseListElement(childel,'attribute');
      break;
    }
  }
  return {
    title: title,
    url: url,
    labels: labels,
    id: id,
    timestamp: timestamp
  };
}

function parseListElement(parentel, expectedNodeName) {
  var result = new Array();
  var children = childElements(parentel);
  for (let i in children) {
    let childel = children[i];
    if(childel.nodeName == expectedNodeName) {
      result.push(elementText(childel));
    }
  }
  return result;
}

function google_bookmark_completer(input, pos, conservative) {
  var bookmarks = yield searchBookmarks(input);
  var titles = new Array();
  for (let i in bookmarks) {
    titles.push(bookmarks[i].title);
  }
  yield co_return({
    count: bookmarks.length,
    indexOf: function(x) { return titles.indexOf(x); },
    get_string: function(i) { return bookmarks[i].url; },
    get_description: function(i) { return bookmarks[i].title; },
    get_input_state: function(i) { return [bookmarks[i].title]; },
    get_value: function(i) {return bookmarks[i];}
  });
}

function goto_google_bookmark(I, loadfun) {
  var title = yield I.minibuffer.read(
    $prompt = 'Go to Google Bookmark:',
    $history = 'google-bookmark-queries',
    $completer = google_bookmark_completer
  );
  var bms = yield searchBookmarks(title);
  var url = bms[0].url;
  loadfun(I,url);
}

function goto_google_bookmark_current_buffer(I) {
  yield goto_google_bookmark(I,
    function(I,url) {
      I.buffer.load(url);
    });
}

function goto_google_bookmark_new_buffer(I) {
  yield goto_google_bookmark_new_buffer_target(I,OPEN_NEW_BUFFER);
}

function goto_google_bookmark_new_buffer_target(I,target) {
  yield goto_google_bookmark(I,
    function(I,url) {
      create_buffer(I.buffer.window,
                    buffer_creator(content_buffer,
                                   $opener = I.buffer,
                                   $load = load_spec({uri:url})),
                    target);
    });
}

function goto_google_bookmark_new_window(I) {
  yield goto_google_bookmark_new_buffer_target(I,OPEN_NEW_WINDOW);
}

function goto_google_bookmark_new_buffer_background(I) {
  yield goto_google_bookmark_new_buffer_target(I,OPEN_NEW_BUFFER_BACKGROUND);
}

interactive('goto-google-bookmark',
            "Queries the title of a Google Bookmark (with completion) and opens it.",
            alternates(
              goto_google_bookmark_current_buffer,
              goto_google_bookmark_new_buffer,
              goto_google_bookmark_new_buffer_background
            ));

define_key(content_buffer_normal_keymap, 'p', 'goto-google-bookmark');
