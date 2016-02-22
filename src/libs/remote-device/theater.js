"use strict";

var Promise = require('bluebird'),
	peer,
	connection,
	PeerJSKey = '';

alert('src/libs/remote-device/theater.js :: Please include your own PeerJS api key');

var Theater = {
	start: function (onConn, onDisconn) {
		return new Promise(function (resolve, reject) {
			peer = new Peer({ key: PeerJSKey });
			//
			peer.on('open', function (id) {
				//
				peer.on('connection', function (conn) {
					// peer connected
					if (!connection) {
						connection = conn;
						//
						connection.on('close', function () {
							// peer left
							connection = null;
							//
							onDisconn();
						});
						//
						onConn();
					}
				});
				//
				resolve(id);
			});
		});
	},
	onData: function (callback) {
		if (connection) {
			connection.on('data', callback);
		}
		return this;
	}
};

module.exports = Theater;
