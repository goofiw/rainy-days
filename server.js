var http = require('http');
fs = require('fs');


var server = http.createServer(function(req, res) {
	console.log(req.method, req.url);
  switch(req.url) {

	  case '/application.js':
	  	fs.readFile('application.js', function (err, script) {
			  if (err) {
			  	console.log("error loading script");
			  	throw err;
			  }
		    res.writeHeader(200);
			  res.write(script);
			  res.end();
		  });
		  break;
	  case '/application.css':
	  	fs.readFile('application.css', function (err, css) {
			  if (err) {
			  	console.log("error loading css");
			  	throw err;
			  }
		    res.writeHeader(200);
			  res.write(css);
			  res.end();
		  });
		  break;
  	case '/':
	  	fs.readFile('index.html', function (err, html) {
			  if (err) {
			  	console.log("error loading index");
			  	throw err;
			  }
		    res.writeHeader(200, {"Content-Type": "text/html"});
			  res.write(html);
			  res.end();
		  });
		  break;
	  default:
		  res.writeHeader(404);
		  res.end();
    break;
  }
})

server.listen(3000);

