var app = {
	//initial variables
	canvas  : null,
	context : null,

	//resizing
	width   : 800,
	height  : 400,

	//nodes
	nodes   : [],

	//timing
	timestamp  : 0,
	now        : 0,
	lastUpdate: 0,

	scoreMessage: "0 : 0",

	init : function(){
		this.canvas  = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');

		this.render();
		this.onInit();
	},
	render : function(){
		this.clear();
		this.update();

		window.requestAnimationFrame(this.render.bind(this));
	},
	clear  : function(){
		this.context.clearRect(0, 0, this.width, this.height);
	},
	update : function(){
	    var dt = Date.now() - this.lastUpdate;

		this.onUpdate(dt);

		for(var index in this.nodes){
			var node = this.nodes[index];

			this.context.fillStyle = node.color;

			//draw round ball
			if (node.id === 'ball') {
				this.context.beginPath();
				this.context.arc(node.x + node.width / 2, node.y + node.height / 2, node.width / 2, 0, 2 * Math.PI);
				this.context.fill();
			}
			else {
				this.context.fillRect(node.x, node.y, node.width, node.height);
            }
		}

		//draws text
		this.context.font = (this.height / 10 + 'px Consolas');
		this.context.fillText(this.scoreMessage, this.width / 2 - this.scoreMessage.length * this.height / 35, this.height / 10);
		if (this.paused) {
			this.context.fillText(this.message, this.width / 2 - (this.message.length * this.height / 35), this.height / 2 - this.height / 20);
        }

		this.lastUpdate = Date.now();
		this.timestamp+=dt;
	},
	getNode : function(id){
		for(var index in this.nodes){
			var node = this.nodes[index];

			if(node.id == id){
				return node;
			}
		}

		return { x : null, y : null, width : null, height : null };
	},

	//events
	onInit   : function(){},
	onUpdate : function(){}
};

window.onload = function(){
	app.init();
};