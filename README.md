# anime-tracker

Chrome extension to track latest anime from torrent source.

## Build Project

### Prerequisites

1. Browserify ([http://browserify.org/]())  
`npm install -g browserify`

2. Node dependencies  
`npm install`

### Build command

1. Build `js/dashboard.js`  
`browserify js/dashboard.js > js/dashboard.out.js`

2. Build `background/torrent.js`  
`browserify background/torrent.js > background/torrent.out.js`

### Local Deployment

1. Go to `Google Chrome`'s extension page.

2. Choose "Developer Mode" and "Load Unpacked Extension".

3. Load this folder.

4. Go to "Option" page, and change `option` to `dashboard`.

5. Ta-da!

## Todos

### Problems to Solve

1. Download torrent inside extension.

### Features

1. Track anime every time interval.

2. Remember which anime has been watched.

3. Use 1 request to fetch latest animes.

### Developement

1. Run `browserify` when code changes.
