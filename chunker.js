class Chunker{
	constructor(canvas,src){
		this.width = 2;
		this.height = 2;
		this.img = new Image();
		this.img.src = src;
		this.x = 0;
		this.y = 0;
		window.addEventListener('keydown',this.keydown.bind(this));
		this.img.addEventListener('load',()=>{
			this.canvas = canvas;
			this.canvas.width = this.img.width;
			this.canvas.height = this.img.height;
			this.ctx = this.canvas.getContext('2d');
			this.paintImage();
			this.chunks = [];
			this.chunkify();
			this.render();
		});
	}
	chunkify(){
		const colors = this.ctx.getImageData(0,0,this.img.width,this.img.height);
		console.log(colors);
		for(let x = 0; x < colors.width; x += this.width){
			this.chunks.push([]);
			for(let y = 0; y < colors.height; y += this.height){
				const chunk = new Chunk(y,x,colors.width,colors.height);
				for(let i = 0; i < this.width; i++){
					for(let j = 0; j < this.height; j++){
						const index = (4 * (x+i) * colors.width) + 4 * (y+j);
						const pixelData = [...colors.data.slice(index,index+4)];
						const opacity = pixelData.pop()/255;
						const color = pixelData.reduce((acc,curr,index)=>{
							if(index === 1) return '#' + acc.toString(16).padStart(2,'0') + curr.toString(16).padStart(2,'0');
							return acc + curr.toString(16).padStart(2,'0');
						});
						chunk.addPixel(new Pixel((y+j),(x+i),color,opacity));
					}
				}
				this.chunks[Math.floor(x/this.width)][Math.floor(y/this.height)] = chunk;
			}
		}
		console.log(this.chunks);
	}
	paintImage(){
		this.ctx.drawImage(this.img,0,0);
	}
	render(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.chunks.forEach(row=>row.forEach(chunk=>{
			chunk.render(this.ctx);
		}));
		this.ctx.globalAlpha = 1;
		this.ctx.strokeStyle = 'black';
		this.ctx.lineWidth = '1px';
		this.ctx.strokeRect(this.x*this.width,0,this.width,this.img.height);
		this.ctx.strokeRect(0,this.y*this.height,this.img.width,this.height);
	}
	keydown(e){
		switch(e.key){
			case 'ArrowRight':
				this.x++;
				this.render();
				break;
			case 'ArrowLeft':
				this.x--;
				this.render();
				break;
			case 'ArrowDown':
				this.y++;
				this.render();
				break;
			case 'ArrowUp':
				this.y--;
				this.render();
				break;
			case 'd':
				this.chunks[this.y].forEach(chunk=>chunk.move(1,0));
				this.render();
				break;
			case 'a':
				this.chunks[this.y].forEach(chunk=>chunk.move(-1,0));
				this.render();
				break;
			case 'w':
				this.chunks.forEach(row=>row[this.x].move(0,-1));
				this.render();
				break;
			case 's':
				this.chunks.forEach(row=>row[this.x].move(0,1));
				this.render();
				break;


		}
	}

}

let chunkImage;
window.addEventListener('load',()=>{
	chunkImage = new Chunker(canvas,'test.png');
});
