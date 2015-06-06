var Rock = function(colour){
	//Represents the colour of the rock
	this.colour = colour;
	
 
	this.radius = 40;
	
	//Position
	this.x = 0;
	this.y = 0;
	
	// Velocity
    this.vx = 0.03;
    this.vy = 0.01;

    // Acceleration
    this.ax = 0;
    this.ay = 0;
	
	this.vr = .3;
	this.r = 0;
};
