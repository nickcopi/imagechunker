class Chunk{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.pixels = [];
	}
	addPixel(pixel){
		this.pixels.push(pixel);
	}
	render(ctx){
		this.pixels.forEach(pixel=>pixel.render(ctx));
	}
}
