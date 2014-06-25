var express = require("express"),
  path = require("path"),
  http = require("http");

var app = express();
app.use(express.static(path.join(__dirname, "public")));

http.createServer(app).listen(3000, function(){
  // console.log(app.routes);
  console.log("Express server listening on port 3000");
});
