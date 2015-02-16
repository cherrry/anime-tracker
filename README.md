# anime-torrent

Chrome extension to track latest anime from torrent source.

## Build Project

### Prerequisites

1. NaCl SDK  
https://developer.chrome.com/native-client/sdk/download

2. Jsx Compiler
`npm install -g jsx`

### Build command

1. Build react components  
Foreach `js/dashboard/*.jsx`, run `jsx filename.jsx > filename.js`.

2. Build NaCl module in `nacl/` with `make`.

### Local Deployment

1. Go to `Google Chrome`'s extension page.

2. Choose "Developer Mode" and "Load Unpacked Extension".

3. Load this folder.

4. Go to "Option" page, and change `option` to `dashboard`.

5. Ta-da!

## Todo

### Problems to Solve

1. Download torrent with NaCl.

### Features

1. Track anime every time interval.

2. Remember which anime has been watched.

3. Use 1 request to fetch latest animes.

### Developement

1. `gulp` task for compiling `.jsx` files automatically.

2. Auto build NaCl module when code change.

3. Try to use browserify to avoid global varaibles in Js.
