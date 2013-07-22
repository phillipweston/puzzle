function ProcessOrders(orders) {
	this.orders = orders;
	this.sortByStart();
	this.findOverlaps();
	this.setDimensions();
	this.removeOverlaps();

	return this.orders;
}


ProcessOrders.prototype.sortByStart = function() {
	this.orders = _.sortBy(this.orders, 'packingStart');
};


ProcessOrders.prototype.removeOverlaps = function() {
	this.orders.forEach(function(order){
		delete order.overlaps;
	});
};


ProcessOrders.prototype.findOverlaps = function() { 

	this.orders.forEach(function(order) {
		var orderStart = order.packingStart;
		var orderEnd = orderStart + order.duration;

		this.orders.forEach(function(check) {
			var checkStart = check.packingStart;
			var checkEnd = checkStart + check.duration;

			if (order !== check) {
				if (orderStart < checkEnd && orderEnd > checkStart) {
					
					if (order.overlaps === undefined) {
						order.overlaps = [check.orderId];
					} else {
						order.overlaps.push(check.orderId);
					}
				}
			}
		});
	});
};


ProcessOrders.prototype.sortSiblings = function(order) {
	var allsiblings = [];
	var sortedsiblings = [];
	var self = this;

	order.overlaps.forEach(function(sibling_id, index) {
		var sibling = _.findWhere(self.orders, {orderId: parseInt(sibling_id)});
		allsiblings.push(sibling.orderId);
		allsiblings.push(sibling.overlaps);
	});

	allsiblings = _.flatten(allsiblings);
	allsiblings = _.uniq(allsiblings);

	allsiblings.forEach(function(sibling_id) {
		var sibling = _.findWhere(self.orders, {orderId: parseInt(sibling_id)});
		sortedsiblings.push(sibling);
	});

	return (_.sortBy(sortedsiblings, 'packingStart'));
};


ProcessOrders.prototype.setDimensions = function() {
	var canvasWidth = 790;
	var padding = 2;
	var left = 105;
	var self = this;

	this.orders.forEach(function(order) {

		if (order.overlaps !== undefined) {
			if (order.width === undefined) {

				var siblings = self.sortSiblings(order);

				siblings.forEach(function(sibling, index) {
					var divisor = '2.' + (siblings.length);
					if (siblings.length == 2) {
						var width = Math.ceil(canvasWidth / siblings.length) -1;
					} else {
						var width = Math.ceil((canvasWidth / (siblings.length)) - divisor);
					}

					if (sibling.width === undefined) {
						sibling.width = Math.ceil(width);
						sibling.xPos = Math.ceil((width + padding) * index + left);
						if (index === 0) sibling.xPos = left;
					}
				});
			}
		} else {
			order.width = 790;
			order.xPos = left;
		}
	console.log(order.orderId + '		overlaps: ' + order.overlaps + '		width: ' + order.width + '		xPos: ' + order.xPos);
	});
};