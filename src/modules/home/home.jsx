"use strict";

var React = require('react'),
	Theater = require('../../libs/remote-device/theater.js'),
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
		}
	};

var Connect = require('./connect.jsx'),
	Simulation = require('./simulation.jsx');

var Home = React.createClass({
	displayName : 'Home',
	//
	componentDidMount: function () {
		var that = this;
		//
		Theater
			.start(function () {
				that.setState({
					puppet: true
				});
			}, function () {
				that.setState({
					puppet: false
				});
			})
			.then(function (id) {
				console.log('Theater started (id: ' + id + ')');
				//
				that.setState({
					theater: id
				});
			});
	},
	getInitialState: function () {
		return {
			puppet: false,
			theater: null
		};
	},
	//
	render: function () {
		var content = (
			<div style={styles.wrapper}>
				<div style={styles.modal}>
					<div style={styles.preps}>
						<img src="./modules/home/img/spinner.gif" style={styles.spinner} />
					</div>
				</div>
			</div>
		);
		if (this.state.theater) {
			content = <Connect theater={this.state.theater} />;
		}
		if (this.state.puppet) {
			content = <Simulation />;
		}
		//
		return content;
	}
});

module.exports = Home;
