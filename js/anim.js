
// set up global javascript variables
var opt=false;
var bgUrl = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1427&q=80'

var blackholeMass = 3000;
var curblackholeMass = 500;

var canvas, gl; // canvas and webgl context

var shaderScript;
var shaderSource;
var vertexShader; // Vertex shader.  Not much happens in that shader, it just creates the vertex's to be drawn on
var fragmentShader; // this shader is where the magic happens. Fragment = pixel.  Vertex = kind of like "faces" on a 3d model.  
var buffer;


/* Variables holding the location of uniform variables in the WebGL. We use this to send info to the WebGL script. */
var locationOfTime;
var locationOfResolution;
var locationOfMouse;
var locationOfMass;
var locationOfclickedTime;

var originY = window.innerHeight,
    originX = window.innerWidth;

var mouse;

var startTime = new Date().getTime(); // Get start time for animating
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
	// standard canvas setup here, except get webgl context
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

	// give WebGL it's viewport
	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

	// kind of back-end stuff
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
	); // ^^ That up there sets up the vertex's used to draw onto. I think at least, I haven't payed much attention to vertex's yet, for all I know I'm wrong.

	shaderScript = document.getElementById("2d-vertex-shader");
	shaderSource = shaderScript.text;
	vertexShader = gl.createShader(gl.VERTEX_SHADER); //create the vertex shader from script
	gl.shaderSource(vertexShader, shaderSource);
	gl.compileShader(vertexShader);

	shaderScript   = document.getElementById("2d-fragment-shader");
	shaderSource   = shaderScript.text;
	fragmentShader = gl.createShader(gl.FRAGMENT_SHADER); //create the fragment from script
	gl.shaderSource(fragmentShader, shaderSource);
	gl.compileShader(fragmentShader);

	program = gl.createProgram(); // create the WebGL program.  This variable will be used to inject our javascript variables into the program.
	gl.attachShader(program, vertexShader); // add the shaders to the program
	gl.attachShader(program, fragmentShader); // ^^
	gl.linkProgram(program);	 // Tell our WebGL application to use the program
	gl.useProgram(program); // ^^ yep, but now literally use it.


	/* 

	Alright, so here we're attatching javascript variables to the WebGL code.  First we get the location of the uniform variable inside the program. 

	We use the gl.getUniformLocation function to do this, and pass thru the program variable we created above, as well as the name of the uniform variable in our shader.

	*/
	locationOfResolution = gl.getUniformLocation(program, "u_resolution");
	locationOfMouse = gl.getUniformLocation(program, "u_mouse");
	locationOfMass = gl.getUniformLocation(program, "u_mass");
	locationOfTime = gl.getUniformLocation(program, "u_time");
	locationOfclickedTime = gl.getUniformLocation(program, "u_clickedTime");

	/*

	Then we simply apply our javascript variables to the program. 
	Notice, it gets a bit tricky doing this.  If you're editing a float value, gl.uniformf works. 

	But if we want to send over an array of floats, for example, we'd use gl.uniform2f.  We're specifying that we are sending 2 floats at the end.  

	You can also send it over to the program as a vector, by using gl.uniform2fv.
	To read up on all of the different gl.uniform** stuff, to send any variable you want, I'd recommend using the table (found on this site, but you need to scroll down about 300px) 

	https://webglfundamentals.org/webgl/lessons/webgl-shaders-and-glsl.html#uniforms

	*/
	gl.uniform2f(locationOfResolution, canvas.width, canvas.height);
	gl.uniform2f(locationOfMouse, mouse.x, mouse.y);
	gl.uniform1f(locationOfMass, curblackholeMass*0.00001);
	gl.uniform1f(locationOfTime, currentTime);
	gl.uniform1f(locationOfclickedTime, clickedTime);


	var texCoordLocation = gl.getAttribLocation(program, "a_texCoord");

	// provide texture coordinates for the rectangle.
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

	// Create a texture.
	var texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);

	// Set the parameters so we can render any size image.
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

	// Upload the image into the texture.
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

	render();
}

function render() {
	var now = new Date().getTime();
	currentTime = (now - startTime) / 1000; // update the current time for animations

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
	gl.uniform1f(locationOfTime, currentTime); // update the time uniform in our shader
	gl.uniform1f(locationOfclickedTime, clickedTime);

	window.requestAnimationFrame(render, canvas); // request the next frame

	positionLocation = gl.getAttribLocation(program, "a_position"); // do stuff for those vertex's
	gl.enableVertexAttribArray(positionLocation);
	gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
	gl.drawArrays(gl.TRIANGLES, 0, 6);
}

window.addEventListener('load', function(event){
	var image = new Image();
  	image.crossOrigin = "Anonymous";
	image.src = bgUrl;
	image.onload = function() {
		init(image);
	}

});

function updateVariableBasedOnMediaQuery() {
    var mediaQuery = window.matchMedia("(max-width: 999px)");
  
    // Check if the media query matches
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


blackhole('#blackhole');



function blackhole(element) {
	var h = $(element).height(),
	    w = $(element).width(),
	    cw = w,
	    ch = h,
	    maxorbit = 255, // distance from center
	    centery = ch/2,
	    centerx = cw/2;

	var startTime = new Date().getTime();
	var currentTime = 0;

	var stars = [],
	    collapse = true, // if hovered
	    expanse = true; // if clicked

	var canvas = $('<canvas/>').attr({width: cw, height: ch}).appendTo(element),
	    context = canvas.get(0).getContext("2d");

	context.globalCompositeOperation = "multiply";

	function setDPI(canvas, dpi) {
		// Set up CSS size if it's not set up already
		if (!canvas.get(0).style.width)
			canvas.get(0).style.width = canvas.get(0).width + 'px';
		if (!canvas.get(0).style.height)
			canvas.get(0).style.height = canvas.get(0).height + 'px';

		var scaleFactor = dpi / 96;
		canvas.get(0).width = Math.ceil(canvas.get(0).width * scaleFactor);
		canvas.get(0).height = Math.ceil(canvas.get(0).height * scaleFactor);
		var ctx = canvas.get(0).getContext('2d');
		ctx.scale(scaleFactor, scaleFactor);
	}

	function rotate(cx, cy, x, y, angle) {
		var radians = angle,
		    cos = Math.cos(radians),
		    sin = Math.sin(radians),
		    nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
		    ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
		return [nx, ny];
	}

	setDPI(canvas, 192);

	var star = function(){

		// Get a weighted random number, so that the majority of stars will form in the center of the orbit
		var rands = [];
		rands.push(Math.random() * (maxorbit/2) + 1);
		rands.push(Math.random() * (maxorbit/2) + maxorbit);

		this.orbital = (rands.reduce(function(p, c) {
			return p + c;
		}, 0) / rands.length);
		// Done getting that random number, it's stored in this.orbital

		this.x = centerx; // All of these stars are at the center x position at all times
		this.y = centery + this.orbital; // Set Y position starting at the center y + the position in the orbit

		this.yOrigin = centery + this.orbital;  // this is used to track the particles origin

		this.speed = (Math.floor(Math.random() * 2.5) + 1.5)*Math.PI/180; // The rate at which this star will orbit
		this.rotation = 0; // current Rotation
		this.startRotation = (Math.floor(Math.random() * 360) + 1)*Math.PI/180; // Starting rotation.  If not random, all stars will be generated in a single line.  

		this.id = stars.length;  // This will be used when expansion takes place.

		this.collapseBonus = this.orbital - (maxorbit * 0.7); // This "bonus" is used to randomly place some stars outside of the blackhole on hover
		if(this.collapseBonus < 0){ // if the collapse "bonus" is negative
			this.collapseBonus = 0; // set it to 0, this way no stars will go inside the blackhole
		}

		stars.push(this);
		this.color = 'rgba(255,255,255,'+ (1 - ((this.orbital) / 255)) +')'; // Color the star white, but make it more transparent the further out it is generated

		this.hoverPos = centery + (maxorbit/2) + this.collapseBonus;  // Where the star will go on hover of the blackhole
		this.expansePos = centery + (this.id%100)*-10 + (Math.floor(Math.random() * 20) + 1); // Where the star will go when expansion takes place



		this.prevR = this.startRotation;
		this.prevX = this.x;
		this.prevY = this.y;

		// The reason why I have yOrigin, hoverPos and expansePos is so that I don't have to do math on each animation frame.  Trying to reduce lag.
	}
	star.prototype.draw = function(){
		// the stars are not actually moving on the X axis in my code.  I'm simply rotating the canvas context for each star individually so that they all get rotated with the use of less complex math in each frame.



		if(!expanse){
			this.rotation = this.startRotation + (currentTime * this.speed);
			if(!collapse){ // not hovered
				if(this.y > this.yOrigin){
					this.y-= 2.5;
				}
				if(this.y < this.yOrigin-4){
					this.y+= (this.yOrigin - this.y) / 10;
				}
			} else { // on hover
				this.trail = 1;
				if(this.y > this.hoverPos){
					this.y-= (this.hoverPos - this.y) / -5;
				}
				if(this.y < this.hoverPos-4){
					this.y+= 2.5;
				}
			}
		} else {
			this.rotation = this.startRotation + (currentTime * (this.speed / 2));
			if(this.y > this.expansePos){
				this.y-= Math.floor(this.expansePos - this.y) / -140;
			}
		}

		context.save();
		context.fillStyle = this.color;
		context.strokeStyle = this.color;
		context.beginPath();
		var oldPos = rotate(centerx,centery,this.prevX,this.prevY,-this.prevR);
		context.moveTo(oldPos[0],oldPos[1]);
		context.translate(centerx, centery);
		context.rotate(this.rotation);
		context.translate(-centerx, -centery);
		context.lineTo(this.x,this.y);
        context.lineWidth = 2; 
        context.lineHeight = 2; 
		context.stroke();
		context.restore();


		this.prevR = this.rotation;
		this.prevX = this.x;
		this.prevY = this.y;
	}


	$('.centerHover').on('click',function(){
		collapse = false;
		expanse = true;

		$(this).addClass('open');
		$('.fullpage').addClass('open');
		setTimeout(function(){
			$('.header .welcome').removeClass('gone');
		}, 500);
	});
	$('.centerHover').on('mouseover',function(){
		if(expanse == false){
			collapse = true;
		}
	});
	$('.centerHover').on('mouseout',function(){
		if(expanse == false){
			collapse = false;
		}
	});

	window.requestFrame = (function(){
		return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			function( callback ){
			window.setTimeout(callback, 1000 / 20);
		};
	})();

	function loop(){
		var now = new Date().getTime();
		currentTime = (now - startTime) / 200;

		context.fillRect(0, 0, cw, ch);

		for(var i = 0; i < stars.length; i++){  // For each star
			if(stars[i] != stars){
				stars[i].draw(); // Draw it
			}
		}
		requestFrame(loop);
	}

	function init(time){
		for(var i = 0; i < 3500; i++){  // create 2500 stars
			new star();
		}
		loop();
	}
	init();
}
