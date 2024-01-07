const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const socketIo = require('socket.io');
const { routesInit } = require("./routes/config_routes");
require("./db/mongoconnect");
const { initSocket } = require('./utility/socket')
// const socketIo = require('socket.io')
const app = express();



app.use(cors());


// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     next();
// });

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

routesInit(app);
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
    
    
});



initSocket(io);


let port = process.env.PORT || 3003
server.listen(port);
server.on("listening", () => {
    console.log(`Listening on port:: http://localhost:${port}/`)
});
