
var ctx;

//Array of all 16 rocks and what state they are in
var rocks = [];

//Starting time
var start = null;


$(document).ready(function(){
	
	init_canvas();
	init_sprites();	//Load sprite images once to save time
	init_rocks();
	
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
	blue_curling_rock_img = new Sprite("images/blue-stone.png", false);
	red_curling_rock_img = new Sprite("images/red-stone.png", false);
}

function init_rocks(){
	r1 = new Rock(BLUE);
	rocks.push(r1);
}

function loop(timestamp){
	if(!start) start = timestamp;	
	var time_elapsed = timestamp - start;

	update(time_elapsed);
	render();
	
	
	window.requestAnimationFrame(loop);
}

function update(time_elapsed){
	Context.context.fillStyle = "#ffffff";
    Context.context.fillRect(0,0,$(window).width(), $(window).height());
	update_velocities(time_elapsed);
	update_positions(time_elapsed);
}

function update_velocities(time_elapsed){
	for (var i = 0; i < rocks.length; i++){
		rocks[i].vy /= 1.02;
		rocks[i].vr /= 1.01;
	}
}

function update_positions(time_elapsed){
	for (var i = 0; i < rocks.length; i++){
		rocks[i].y += rocks[i].vy * time_elapsed;
		rocks[i].r += rocks[i].vr * time_elapsed/100;
	}
}

function render() {
	renderEntities(rocks);
}

function renderEntities(list) {
    for(var i=0; i<list.length; i++) {
        renderEntity(list[i]);
    }    
}

function renderEntity(entity){
	if(entity.colour == BLUE){
		blue_curling_rock_img.rotate(entity.x, entity.y, entity.r);
		blue_curling_rock_img.draw(entity.x,entity.y,entity.radius,entity.radius);
	}
	else {
		red_curling_rock_img.draw(entity.x,entity.y,entity.radius,entity.radius);
	}
}

