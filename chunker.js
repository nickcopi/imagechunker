class Chunker{
	constructor(canvas,src){
		this.width = 2;
		this.height = 2;
		this.img = new Image();
		this.img.src = src;
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
			for(let y = 0; y < colors.height; y += this.height){
				const chunk = new Chunk(y,x);
				for(let i = 0; i < this.width; i++){
					for(let j = 0; j < this.height; j++){
						const index = (4 * (x+i) * colors.width) + 4 * (y+j);
						const pixelData = [...colors.data.slice(index,index+4)];
						//console.log(pixelData,x+i,y+j);
						const opacity = pixelData.pop()/255;
						const color = pixelData.reduce((acc,curr,index)=>{
							if(index === 1) return '#' + acc.toString(16).padStart(2,'0') + curr.toString(16).padStart(2,'0');
							return acc + curr.toString(16).padStart(2,'0');
						});
						chunk.addPixel(new Pixel((y+j),(x+i),color,opacity));
					}
				}
				this.chunks.push(chunk);
			}
		}
		console.log(this.chunks);
	}
	paintImage(){
		this.ctx.drawImage(this.img,0,0);
	}
	render(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.chunks.forEach(chunk=>{
			chunk.render(this.ctx);
		});
	}

}

let chunkImage;
window.addEventListener('load',()=>{
	chunkImage = new Chunker(canvas,'test.png');
});
