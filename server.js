var http = require("http");
var path = require("path");
var express = require("express");
var courseApi = require("./apis/courseapi");
require("./Date.prototype.dateAdd");

const PORT = process.env.PORT || 12103;

var app = express();
var server = http.createServer(app);
var io = require("socket.io").listen(server);
io.sockets.on("connection", function(socket) {
  socket.on("updatetime", function(data) {
    console.log("server.updatetime:" + data.second);
    // Get data for Screenshot
    var ssdata = courseApi.getScreenshotData(data.second);
    // Get data for Whiteboard
    var wbdata = courseApi.getWhiteBoardData(data.second);
    // Notify client through emit with data
    socket.emit("playCourse", { ssdata: ssdata, wbdata: wbdata });
  });
});

var staticPath = path.resolve(__dirname, "");
app.use(express.static(staticPath));

server.listen(PORT, function() {
  console.log("Server is listening at http://localhost:" + PORT);
});

function tick() {
  var dt = new Date();
  dt.dateAdd("year", -1);
  dt.dateAdd("month", -9);
  dt.dateAdd("day", -18);
  //dt.dateAdd('day', -2);
  dt = dt.toUTCString();
  io.sockets.send(dt);
}
setInterval(tick, 1000);
