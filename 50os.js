dumpln('50os');

let os_type = getenv("OSTYPE");
let config_dir = get_home_directory().clone();
config_dir.appendRelativePath(`.conkerorrc/${os_type}/`);
load(make_file(`${config_dir.path}/50os.${os_type}.js`));
