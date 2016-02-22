"use strict";

var React = require('react'),
	Theater = require('../../libs/remote-device/theater.js'),
	qr = require('qr-encode'),
	$ = require('jquery'),
	styles = {
		wrapper: {
			position: 'absolute',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			height: '100%',
			width: '100%',
			zIndex: 1,
			overflow: 'hidden',
			textAlign: 'center'
		},
		modal: {
			display: 'inline-block',
			textAlign: 'center',
			borderRadius: 5,
			margin: '10% auto',
			backgroundColor: '#FFF',
			color: '#040F1A',
			height: 400,
			width: 400
		},
		preps: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			height: '90%'
		},
		spinner: {
			height: 25
		},
		qr: {
			wrapper: {
				height: 300,
				margin: 20
			},
			image: {
				padding: 10,
				border: '2px solid #040F1A',
				height: 280
			}
		},
		url: {
			padding: '0 20px'
		}
	},
	HOST = 'http://localhost:8081/dist/#/';

var Connect = React.createClass({
	displayName: 'Connect',
	//
	getInitialState: function () {
		return {
			url: HOST + '?theater=' + this.props.theater
		};
	},
	//
	render: function () {
		var that = this,
			longUrl = HOST + '?theater=' + this.props.theater,
			url = this.state.url,
			dataURI = qr(longUrl, { type: 6, size: 6, level: 'Q' });
		//
		return (
			<div style={styles.wrapper}>
				<div style={styles.modal}>
					<div style={styles.qr.wrapper}>
						<img style={styles.qr.image} src={dataURI} />
					</div>
					<div style={styles.url}>
						{url}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Connect;
