"use strict";

var React = require('react'),
	Theater = require('../../libs/remote-device/theater.js'),
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
			margin: '5% auto',
			backgroundColor: '#FFF',
			color: '#040F1A',
			height: '75%',
			width: '75%'
		},
		canvas: {
			width: '90%',
			height: '90%',
			margin: '3.5% auto'
		}
	};

var SCREEN_WIDTH = window.innerWidth,
	SCREEN_HEIGHT = window.innerHeight,
	iphone,
	camera,
	scene,
	renderer,
	remoteDeviceData = {
		orientation: {
			alpha: 0,
			beta: 0,
			gamma: 0
		}
	},
	myReq;

var angle = 0;
var d2r = Math.PI / 180;
var eyem = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
var rotType = "YXZ";
var rotm;
var devm;

var animate = function () {
	myReq = window.requestAnimationFrame(animate);
	//
	if (iphone) {
		//
        var alpha = remoteDeviceData.orientation.alpha || 0;
        var beta = remoteDeviceData.orientation.beta || 0;
        var gamma = remoteDeviceData.orientation.gamma || 0;
		//
        rotm = new THREE.Quaternion().setFromEuler(new THREE.Euler(beta * d2r, alpha * d2r, -gamma * d2r, rotType));
        devm = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -angle * d2r, 0));
        rotm.multiply(devm).multiply(eyem);
        iphone.quaternion.copy(rotm);
	}
	renderer.render(scene, camera);
}

var init = function (element) {
	//
	//camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH/SCREEN_HEIGHT, 1, 10000);
	camera = new THREE.PerspectiveCamera(75, element.offsetWidth/element.offsetHeight, 1, 10000);
	camera.position.z = 2500;
	scene = new THREE.Scene();
	//
	var light = new THREE.AmbientLight(0xFFFFFF);
	light.position.set(50, -400, 500);
	scene.add(light);
	//
	renderer = new THREE.WebGLRenderer({
		preserveDrawingBuffer: true,
		alpha: true
	});
	//renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	renderer.setSize(element.offsetWidth, element.offsetHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setClearColor(0xFFFFFF, 1);
	//
	var loader = new THREE.JSONLoader().load('./modules/home/iPhone5/iPhone5.js', setupScene);
	//
	$(element).empty().append(renderer.domElement);
}

var setupScene = function (geometry, materials) {
    var materialBack =  {
    	opacity:1,
    	map: THREE.ImageUtils.loadTexture('./modules/home/iPhone5/diffuse.png'),
    	color: 0x000000,
    	ambient: 0x777777,
    	defuse: 0xBBBB9B,
    	shininess: 50,
    	shading: THREE.SmoothShading
    };
	var meshBack = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial(materialBack));
	meshBack.position.set(0,0,0);
	meshBack.scale.set(3, 3, 3);
	//
	var materialFront =  {
		opacity:1,
		map: THREE.ImageUtils.loadTexture('./modules/home/iPhone5/screen.png'),
		color: 0x000000,
		ambient: 0xAAAAAA,
		defuse: 0xBBBB9B,
		shininess: 100,
		shading: THREE.SmoothShading
	};
	var meshFront = new THREE.Mesh(new THREE.PlaneBufferGeometry(405, 712), new THREE.MeshPhongMaterial(materialFront));
	meshFront.position.set(5, 0, 92);
	meshFront.scale.set(3, 3, 3);
	//
	iphone = new THREE.Object3D();
	iphone.add(meshBack);
	iphone.add(meshFront);
	scene.add(iphone);
}

var Simulation = React.createClass({
	displayName: 'Simulation',
	//
	componentDidMount: function () {
		Theater.onData(function (data) {
			remoteDeviceData = data;
		});
		//
		init(React.findDOMNode(this.refs.canvas));
		animate();
	},
	componentWillUnmount: function () {
		if (myReq) {
			window.cancelAnimationFrame(myReq);	
		};
	},
	//
	render: function () {
		return (
			<div style={styles.wrapper}>
				<div style={styles.modal}>
					<div ref="canvas" style={styles.canvas}></div>
				</div>
			</div>
		);
	}
});

module.exports = Simulation;