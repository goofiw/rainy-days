var http = require('http');
fs = require('fs');


var server = http.createServer(function(req, res) {
  switch(req.url) {
  	case '/*':
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
	  case '/application.js':
	  	fs.readFile('application.js', function (err, script) {
			  if (err) {
			  	console.log("error loading index");
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
			  	console.log("error loading index");
			  	throw err;
			  }
		    res.writeHeader(200);
			  res.write(css);
			  res.end();
		  });
		  break;
  }
});

server.listen(3000);

