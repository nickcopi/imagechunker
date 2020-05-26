class Chunk{
	constructor(x,y,width,height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.pixels = [];
	}
	addPixel(pixel){
		this.pixels.push(pixel);
	}
	render(ctx){
		this.pixels.forEach(pixel=>pixel.render(ctx));
	}
	move(x,y){
		this.pixels.forEach(pixel=>{
			pixel.x += x;
			if(pixel.x < 0) pixel.x = this.width-1;
			if(pixel.x >= this.width) pixel.x = 0;
			pixel.y += y;
			if(pixel.y < 0) pixel.y = this.height-1;
			if(pixel.y >= this.height) pixel.y = 0;
		});
	}
}
