function Canvas(orders) {
	this.canvas = document.getElementById("orderCanvas");
	this.context = this.canvas.getContext("2d");
	this.context.fillStyle = "#333";
	this.context.strokeStyle = "#000000";
	this.orders = orders;

	this.render();
}

Canvas.prototype.drawlines = function() {
	this.context.fillStyle = "#EEE";
	this.context.fillRect(100, 0, 900, 600);

	for (var y = 0.5; y < 600; y += 60) {
  	this.context.moveTo(100, y);
  	this.context.lineTo(900, y);
  	this.context.fillStyle = "#333";
  	this.context.fillText((Math.floor(y / 60) + ':00'), 70, (y+10));
	}

	this.context.moveTo(100.5, 0);
	this.context.lineTo(100.5, 900);

	this.context.strokeStyle = "#666";
	this.context.stroke();
};

Canvas.prototype.render = function() {
	var self = this;
	this.drawlines();

	this.orders.forEach(function(order) {
		self.context.fillStyle = "#333";
		self.context.strokeRect(order.xPos, order.packingStart, order.width, order.duration);
		self.context.fillRect(order.xPos, order.packingStart, order.width, order.duration);

		var textCanvas = document.getElementById("orderCanvas");
	  	var textContext = textCanvas.getContext("2d");
	  	textContext.fillStyle = "#EEE";
		textContext.font = "14px sans-serif";
		textContext.fillText(order.orderId, (order.xPos+10), (order.packingStart+20));
	});
};