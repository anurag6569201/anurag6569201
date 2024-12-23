// set up global javascript variables
var opt=false;
var bgUrl = [
	'https://images.unsplash.com/photo-1608178398319-48f814d0750c?q=80&w=1479&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://images.unsplash.com/photo-1592518973646-8f50fe9d53c7?q=80&w=1555&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=1479&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?q=80&w=1359&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://images.unsplash.com/photo-1555448248-2571daf6344b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];
var blackholeMass = 1500;
var curblackholeMass = 100;

var canvas, gl;

var shaderScript;
var shaderSource;
var vertexShader; 
var fragmentShader;
var buffer;


var locationOfTime;
var locationOfResolution;
var locationOfMouse;
var locationOfMass;
var locationOfclickedTime;

var originY = window.innerHeight,
    originX = window.innerWidth;

var mouse;

var startTime = new Date().getTime(); 
var currentTime = 0;

var clicked = false,
    clickedTime = 0;

$(document).mousedown(function(){
	clicked = true;
});
$(document).mouseup(function(){
	clicked = false;
});

function init(image) {

	canvas = document.getElementById('glscreen');
	gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	canvas.width  = window.innerWidth >= window.innerHeight ? window.innerWidth : window.innerHeight;
	canvas.height = window.innerWidth >= window.innerHeight ? window.innerWidth : window.innerHeight;

	mouse = {x: originX/2, y: -(originY/2) + canvas.height, moved: false};
	$(document).mousemove(function(e) {
        mouse.x = e.pageX;
        mouse.y = -e.pageY + canvas.height;
        mouse.moved = opt;
    
        gl.uniform2f(locationOfMouse, mouse.x, mouse.y);
    });


	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);


	buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(
		gl.ARRAY_BUFFER, 
		new Float32Array([
			-1.0, -1.0, 
			1.0, -1.0, 
			-1.0,  1.0, 
			-1.0,  1.0, 
			1.0, -1.0, 
			1.0,  1.0]), 
		gl.STATIC_DRAW
	);

	shaderScript = document.getElementById("2d-vertex-shader");
	shaderSource = shaderScript.text;
	vertexShader = gl.createShader(gl.VERTEX_SHADER); 
	gl.shaderSource(vertexShader, shaderSource);
	gl.compileShader(vertexShader);

	shaderScript   = document.getElementById("2d-fragment-shader");
	shaderSource   = shaderScript.text;
	fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, shaderSource);
	gl.compileShader(fragmentShader);

	program = gl.createProgram();
	gl.attachShader(program, vertexShader); 
	gl.attachShader(program, fragmentShader); 
	gl.linkProgram(program);	
	gl.useProgram(program);


	
	locationOfResolution = gl.getUniformLocation(program, "u_resolution");
	locationOfMouse = gl.getUniformLocation(program, "u_mouse");
	locationOfMass = gl.getUniformLocation(program, "u_mass");
	locationOfTime = gl.getUniformLocation(program, "u_time");
	locationOfclickedTime = gl.getUniformLocation(program, "u_clickedTime");

	gl.uniform2f(locationOfResolution, canvas.width, canvas.height);
	gl.uniform2f(locationOfMouse, mouse.x, mouse.y);
	gl.uniform1f(locationOfMass, curblackholeMass*0.00001);
	gl.uniform1f(locationOfTime, currentTime);
	gl.uniform1f(locationOfclickedTime, clickedTime);


	var texCoordLocation = gl.getAttribLocation(program, "a_texCoord");


	var texCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, 		new Float32Array([
		-1.0, -1.0, 
		1.0, -1.0, 
		-1.0,  1.0, 
		-1.0,  1.0, 
		1.0, -1.0, 
		1.0,  1.0]), 
			    gl.STATIC_DRAW);
	gl.enableVertexAttribArray(texCoordLocation);
	gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

	
	var texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

	
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

	render();
}

function render() {
	var now = new Date().getTime();
	currentTime = (now - startTime) / 1000; 

	if(curblackholeMass < blackholeMass - 50){
		curblackholeMass += (blackholeMass-curblackholeMass) * 0.03;
	}

	if(clicked){
		clickedTime += 0.03;
	} else if(clickedTime > 0 && clicked == false) {
		clickedTime += -(clickedTime*0.015);
	}

	if(mouse.moved == false){
		mouse.y = (-(originY/2) + Math.sin(currentTime * 0.7) * ((originY * 0.25))) + canvas.height;
		mouse.x = (originX/2) + Math.sin(currentTime * 0.6) * -(originX * 0.35);
	}

	gl.uniform1f(locationOfMass, curblackholeMass*0.00001);
	gl.uniform2f(locationOfMouse, mouse.x, mouse.y);
	gl.uniform1f(locationOfTime, currentTime);
	gl.uniform1f(locationOfclickedTime, clickedTime);

	window.requestAnimationFrame(render, canvas);
	positionLocation = gl.getAttribLocation(program, "a_position");
	gl.enableVertexAttribArray(positionLocation);
	gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
	gl.drawArrays(gl.TRIANGLES, 0, 6);
}

window.addEventListener('load', function(event){
	var image = new Image();
  	image.crossOrigin = "Anonymous";
	let currentTime = new Date();
	var min=currentTime.getMinutes()
	if (min < 10) {
        image.src = bgUrl[0];
    } else if (min >= 10 && min < 20) {
        image.src = bgUrl[1];
    } else if (min >= 20 && min < 30) {
        image.src = bgUrl[2];
    } else if (min >= 30 && min < 40) {
        image.src = bgUrl[3];
    } else if (min >= 40 && min <50) {
        image.src = bgUrl[4];
    } else if (min >=50 && min < 60) {
        image.src = bgUrl[5];
    }
	image.onload = function() {
		init(image);
	}
});

function updateVariableBasedOnMediaQuery() {
    var mediaQuery = window.matchMedia("(max-width: 999px)");
  
  
    if (mediaQuery.matches) {
      opt = false;
    } else {
      opt = true;
    }
  
  }
  
  updateVariableBasedOnMediaQuery();
  
  window.addEventListener('resize', function(event) {
    updateVariableBasedOnMediaQuery();
  });
