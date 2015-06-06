
var ctx;

//Array of all 16 rocks and what state they are in
var rocks = [];

//Starting time
var start = null;


var c = 20;



//Sprites
var scene;
var sprite_rock;
var sprite_bg;
var sprite_rocks;


$(document).ready(function(){
	scene=sjs.Scene({w:$(window).width(),h:$(window).height()});
	//init_canvas();
	init_rocks();
	init_sprites();	//Load sprite images once to save time

	
	window.requestAnimationFrame(loop);
});

function init_canvas() {
	$("#curling-arena").attr("height", $(window).height());
	$("#curling-arena").attr("width", $(window).width());
	
	
	Context.create("curling-arena");

	var w = $("#curling-arena").width();
	var h = $("#curling-arena").height();
}

function init_sprites(){
	//Background Sprite
	sprite_bg = scene.Sprite('images/bg.png', {layer: scene.Layer('backround')});
	
	sprite_rocks = sjs.SpriteList();
	//For each rock, add a sprite at it's position
	for (var i = 0; i < rocks.length; i++){
		sprite_rock = scene.Sprite('images/blue-stone.png', {layer: scene.Layer('front'), x: rocks[i].x, y: rocks[i].y});
		sprite_rock.size(IMAGE_SIZE,IMAGE_SIZE);
		sprite_rock.scale($(window).width() * ROCK_TO_WIDTH_RATIO / IMAGE_SIZE);
		sprite_rocks.add(sprite_rock);
	}


	
	
	scene.loadImages(['images/bg.png', 'images/blue-stone.png'],function() {	
		sprite_bg.size(512,512);
		sprite_bg.scale($(window).width() / 512);
		//bg.move($(window).width() / 4,0);
		sprite_bg.update();
		
		render();
	});

}

function init_rocks(){
	var ROCK_RADIUS = $(window).width() * ROCK_TO_WIDTH_RATIO; // Rock radius
	var r1 = new Rock(BLUE);
	var r2 = new Rock(RED);
	
	r1.radius = ROCK_RADIUS;
	r1.x = $(window).width(); r1.y = $(window).height() / 2; r1.vr = 0.03; r1.vx = -10.0;
	
	r2.x = 180; r2.y = 190;
	r2.radius = ROCK_RADIUS;
	
	rocks.push(r1);
	rocks.push(r2);
}

function loop(timestamp){

	if(!start) start = timestamp;	
	var time_elapsed = timestamp - start;
	update(time_elapsed/1000);  //Divide by 1000 to pass in more intuitive units of seconds

	render();

	
	
	window.requestAnimationFrame(loop);
}

function update(time_elapsed){
	update_velocities(time_elapsed);
	update_positions(time_elapsed);
}

function update_velocities(time_elapsed){
	for (var i = 0; i < rocks.length; i++){
		rocks[i].vy = -get_new_velocity(time_elapsed, rocks[i].vy);
		rocks[i].vx = -get_new_velocity(time_elapsed, rocks[i].vx);
		rocks[i].vr /= 1.01;
	}
}

function get_new_velocity(time_elapsed, old_velocity){
	var x = Math.sqrt(2 * (0.5 * Math.pow(old_velocity, 2) - MU * Math.abs(old_velocity) * time_elapsed)) ;
	if (isNaN(x)){
		return 0;
	}
	else return x;
}

function update_positions(time_elapsed){
	for (var i = 0; i < rocks.length; i++){
		rocks[i].y += rocks[i].vy * time_elapsed;
		rocks[i].x += rocks[i].vx * time_elapsed;
		rocks[i].r_change = rocks[i].vr * time_elapsed ;
	}
}

function render() {
	var i = 0;
	while(r = sprite_rocks.iterate()){
			r.position(rocks[i].x, rocks[i].y);
			r.rotate(rocks[i].r_change);
			r.update();
			i++;
	}
}

