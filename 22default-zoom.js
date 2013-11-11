// Time-stamp: "2013-10-15 08:39:06 phil"

dumpln("22defaultzoom");

// URL patterns for sites we want to view at 100% (normal) zoom
var normal_zoom_sites = [
   /^https?:\/\/[^/]*zen\.co\.uk\//         ,
   /^https?:\/\/my\.if\.com\//              ,
   /^https?:\/\/[^/]*hsbc\.co\.uk\//        ,
   /^https?:\/\/[^/]*selftrade\.co\.uk\//   ,
   /^https?:\/\/[^/]*britishgas\.co\.uk\//  ,
   /^https?:\/\/[^/]*freecycle\.org\//      ,
   /^https?:\/\/[^/]*orange\.co\.uk\//      ,
   /^https?:\/\/192\.168\.1\.2\//           ,
   /^https?:\/\/[^/]*tesco\.com\//          ,
   /^https?:\/\/[^/]*cahoot\.com\//         ,
   /^https?:\/\/[^/]*americanexpress\.com\//,
   /^https?:\/\/[^/]*southern-electric\.co\.uk\//       ,
   /^https?:\/\/[^/]*raileasy\.co\.uk\//
];

// Default page zoom
function my_zoom_set (buffer) {
    var zoom = 150; // increase zoom by default

    // Is this URL one of those we want at 100% zoom?
    function buffer_url_matches(element, index, array) {
        return (buffer.display_uri_string.search(element) != -1);
    }

    if (normal_zoom_sites.some(buffer_url_matches)) {
        zoom = 100;
    }

    browser_zoom_set(buffer, false, zoom);
}

// Defer to the os-specific rc subfile
//add_hook('content_buffer_started_loading_hook', my_zoom_set);
