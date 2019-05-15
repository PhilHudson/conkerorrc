// Time-stamp: "2019-05-09 15:11:03 phil"

dumpln("22defaultzoom");

// URL patterns for sites we want to view at 100% (normal) zoom
var ph_normal_zoom_sites = [
  /^https?:\/\/[^/]*zen\.co\.uk\//,
  /^https?:\/\/my\.if\.com\//,
  /^https?:\/\/[^/]*hsbc\.co\.uk\//,
  /^https?:\/\/[^/]*selftrade\.co\.uk\//,
  /^https?:\/\/[^/]*britishgas\.co\.uk\//,
  /^https?:\/\/[^/]*freecycle\.org\//,
  /^https?:\/\/[^/]*orange\.co\.uk\//,
  /^https?:\/\/192\.168\.1\.2\//,
  /^https?:\/\/[^/]*tesco\.com\//,
  /^https?:\/\/[^/]*cahoot\.com\//,
  /^https?:\/\/[^/]*americanexpress\.com\//,
  /^https?:\/\/[^/]*southern-electric\.co\.uk\//,
  /^https?:\/\/[^/]*raileasy\.co\.uk\//
];

var ph_120_zoom_sites = [
  /^https?:\/\/[^/]*conkeror\.org\//,
  /^https?:\/\/[^/]*stackoverflow\.com\//,
  /^https?:\/\/[^/]*stackexchange\.com\//,
  /^https?:\/\/[^/]*superuser\.com\//,
  /^https?:\/\/[^/]*serverfault\.com\//,
  /^https?:\/\/[^/]*help\.ubuntu\.com\//,
  /^https?:\/\/[^/]*forums\.debian\.net\//,
  /^https?:\/\/[^/]*askubuntu\.com\//,
  /^https?:\/\/[^/]*wikipedia\.org\//,
  /^https?:\/\/[^/]*wikiquote\.org\//,
  /^https?:\/\/[^/]*startpage\.com\//,
  /^https?:\/\/[^/]*orgmode\.org\//,
  /^https?:\/\/[^/]*c4ss\.org\//,
  /^https?:\/\/[^/]*ettv\.tv\//,
  /^https?:\/\/[^/]*github\.com\//
];

var ph_150_zoom_sites = [
  /^https?:\/\/[^/]*emacswiki\.org\//,
  /^https?:\/\/[^/]*(www|lists)\.gnu\.org\//,
  /^https?:\/\/[^/]*facebook\.com\//,
  /^https?:\/\/[^/]*dailykos\.com\//,
  /^https?:\/\/[^/]*twitter\.com\//,
  /^https?:\/\/[^/]*mail\.google\.com\//,
  /^https?:\/\/[^/]*reddit\.com\//,
  /^https?:\/\/[^/]*joindiaspora\.com\/stream/,
  /^https?:\/\/[^/]*sourceforge\.net/,
  /^https?:\/\/[^/]*exercism\.io/,
  /^https?:\/\/[^/]*loomio\.org/,
  /^https?:\/\/[^/]*readthedocs\.io/,
  /^https?:\/\/[^/]*sachachua\.com/,
  /^https?:\/\/[^/]*clojure\.org/,
  /^https?:\/\/[^/]*irreal\.org/,
  /^https?:\/\/[^/]*theregister\.co\.uk\//
];

var default_zoom = Number(getenv("CONKEROR_DEFAULT_ZOOM")) || 100; // don't increase zoom by default

function ph_zoom_set(buffer) {
  var zoom = default_zoom;

  function buffer_url_matches(element, index, array) {
    return buffer.display_uri_string.search(element) != -1;
  }

  if (ph_normal_zoom_sites.some(buffer_url_matches)) {
    zoom = zoom * 1;
  } else if (ph_120_zoom_sites.some(buffer_url_matches)) {
    zoom = zoom * 1.2;
  } else if (ph_150_zoom_sites.some(buffer_url_matches)) {
    zoom = zoom * 1.5;
  }

  if (zoom != 100) {
    browser_zoom_set(buffer, false, zoom);
  }
}

// Defer to the os-specific rc subfile
add_hook("content_buffer_started_loading_hook", ph_zoom_set);
add_hook("create_buffer_late_hook", ph_zoom_set);
add_hook("current_content_buffer_finished_loading_hook", ph_zoom_set);
add_hook("current_content_buffer_location_changed_hook", ph_zoom_set);

add_hook("mode_line_hook", mode_line_adder(zoom_widget));
