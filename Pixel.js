class Pixel{
	constructor(x,y,color,opacity){
		this.x = x;
		this.y = y;
		this.color = color;
		this.opacity = opacity;
	}
	render(ctx){
		ctx.fillStyle = this.color;
		ctx.globalAlpha = this.opacity;
		ctx.fillRect(this.x,this.y,1,1);
	}

}
