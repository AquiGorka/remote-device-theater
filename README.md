# Remote Device Theater

### Description
Ever wanted to change your Android phone in for an iPhone?
How about we "virtually" do that?
This project includes two parts:
* Theater (this repo)
* Puppet ([https://github.com/AquiGorka/remote-device-puppet]([https://github.com/AquiGorka/remote-device-puppet))

The Theater expects a webRTC enabled browser to establish a p2p connection (this is the Puppet app). Once the connection is established the Theater renders a 3D virtual iPhone in the browser, the Puppet app sends gyroscope data to the Theater which rotates the virtual iPhone around accordingly.

### Technologies and tools used:

* Javascript
* React
* PeerJS
* webRTC
* ThreeJS
* WebGL
* CSS
* HTML
* Browserify
* Reactify (for JSX and ES6 syntax)
* npm (package manager and task runner)

### Build & Run
```sh
npm install
npm run build
npm run serve 8080
```
Then open up a browser to: http://localhost:8080 and head to dist/

Don't forget to get your own PeerJS api key and add it to /src/libs/remote-device/theater.js

### Demo
[http://remote-device-theater.surge.sh/](http://remote-device-theater.surge.sh/)