var orders = [
	{"orderId" : 1, "packingStart" : 224, "duration" : 69},
	{"orderId" : 2, "packingStart" : 335, "duration" : 91},
	{"orderId" : 3, "packingStart" : 23,  "duration" : 47},
	{"orderId" : 4, "packingStart" : 130, "duration" : 52},
	{"orderId" : 5, "packingStart" : 5,   "duration" : 183},
	{"orderId" : 6, "packingStart" : 253, "duration" : 71},
	{"orderId" : 7, "packingStart" : 41,  "duration" : 68},
	// {"orderId" : 8, "packingStart" : 255,  "duration" : 30},
	// {"orderId" : 9, "packingStart" : 40,   "duration" : 50},
];

var batchOfOrders = new ProcessOrders(orders);
var orderCanvas = new Canvas(batchOfOrders);
