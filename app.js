const hostname = '127.0.0.1';
const port = 3000;

var express = require("express");
var bodyParser     =        require("body-parser");
var app = express();
var save = require('save');
var productData = save('product');
var countGet =1;
var countPost =1;
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); // Body parser use JSON data



app.get('/', function(req, res) {
		var instruction = 'Save product using http://'+hostname+':'+port+'/sendPost with  name and price \n';
			instruction += 'Get one product details using http://'+hostname+':'+port+'/sendGet/:id \n';
			instruction += 'Update product details using http://'+hostname+':'+port+'/sendUpdate/:id \n';
			instruction += 'Delete product details using http://'+hostname+':'+port+'/sendDelete/:id ';
		  res.send(instruction);
});

//Get one product detail
app.get('/sendGet/:id', function(req, res) {
		console.log('received request');	
		console.log("sendGet:"+countGet);
		productData.findOne({ _id: req.params.id }, function (error, product) {

	    if (product) {
	      // Send the user if no issues
	      
	    if(res.send(product))  console.log('sending response');
	    
	    } else {
	      // Send 404 header if the user doesn't exist
	      if(res.send(404))  console.log('sending response');
	    }
	  })
		countGet++;
 });



//Save products detail
app.post('/sendPost', function(req, res) {
	console.log('received request');	
	console.log("sendPost:"+countPost);
	if(req.body.name == undefined) return res.send('Please supply product name');
	if(req.body.price == undefined) return res.send('Please supply product price');
	 var newProduct = {
		name: req.body.name, 
		price: req.body.price
	}
	productData.create(newProduct, function(err, product) {
	  // Outputs { name: 'Dom', _id: 1 } 
	  if(res.send(product))  console.log('sending response');

	})
	countPost++;
});


//Delete product details
app.delete('/sendDelete/:id', function(req, res) {

	 // Delete the user with the persistence engine
  productData.delete(req.params.id, function (error, user) {
    // Send a 200 OK response
    res.send(200)
  })

});


//Update
app.put('/sendUpdate/:id', function(req, res) {

	 var Product = {
	 	_id: req.params.id,
		name: req.body.name, 
		price: req.body.price
	}
	  // Update the user with the persistence engine
  productData.update(Product, function (error, user) {

    // If there are any errors, pass them to next in the correct format
    if (error) return res.send('error in updating');

    // Send a 200 OK response
    res.send(200)
  })
});