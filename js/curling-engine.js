var ctx;
$(document).ready(function(){
	$("#curling-arena").attr("height", $(window).height());
	$("#curling-arena").attr("width", $(window).width());
	
	var curling_arena = $("#curling-arena")[0];
	ctx = curling_arena.getContext("2d");
	var w = $("#curling-arena").width();
	var h = $("#curling-arena").height();
	window.requestAnimationFrame(paint);
});

var start = null;

function paint(timestamp){
	if(!start) start = timestamp;	
	var time_elapsed = timestamp - start;
	
	ctx.fillRect(time_elapsed/100,10,10,10);
	
	
	window.requestAnimationFrame(paint);
}

