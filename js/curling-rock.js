var Rock = function(colour){
	//Represents the colour of the rock
	this.colour = colour;
	
 
	this.radius = 40;
	
	//Position
	this.x = 0;
	this.y = 0;
	
	// Velocity
    this.vx = 0;
    this.vy = 0;

    // Acceleration
    this.ax = 0;
    this.ay = 0;
	
	//Rotation
	this.vr = 0;
	this.r = 0;
	this.r_change = 0;
	
	this.x_change = 0;
	this.y_change = 0;
};
