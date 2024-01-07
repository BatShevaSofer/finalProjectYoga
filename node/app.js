// const express = require("express");
// const path = require("path");
// const http = require("http");
// const cors = require("cors");
// const bodyParser = require('body-parser');
// // חובה כדי שנוכל לעבוד עם קבצים
// const fileUpload = require("express-fileupload");

// const { routesInit } = require("./routes/config_routes")
// require("./db/mongoconnect");

// const app = express();

// app.use(cors());

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// // מפעיל את האפשרות באקספרס לעבוד עם קבצים
// app.use(fileUpload({ limits: { fileSize: 1024 * 1024 * 5 } }))

// app.use(express.json());
// // הגדרת תקיית הפאבליק כתקייה ראשית
// app.use(express.static(path.join(__dirname, "public")))

// routesInit(app);

// const server = http.createServer(app);

// let port = process.env.PORT || 3003
// server.listen(port);



////////////////////////////////////////////////
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const { routesInit } = require("./routes/config_routes");
require("./db/mongoconnect");
// const socketIo = require('socket.io')
const app = express();
const http = require('http').createServer(app);

// const io = socketIo(http, {
//     cors: {
//         // origin: 'http://localhost:3000',
//         // methods: ["GET", "POST"],
//         // credentials: true
//         origin:'*'
//     }
// });

app.use(cors({
    origin: '*',
    methods: ["GET", "POST","PATCH"],
    credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload({ limits: { fileSize: 1024 * 1024 * 5 } }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// הגדרת נתיבי ה-API
routesInit(app);

// הגדרת נתיב לאפשרות העברת קבצים
// app.get('/api', (req, res) => {
//     res.json({
//         message: 'Hello world',
//     });
// });

// let users = [];

// io.on('connection', (socket) => {
//     console.log(`⚡: ${socket.id} user just connected!`);

//     socket.on('message', (data) => {
//         io.emit('messageResponse', data);
//     });

//     socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

//     socket.on('newUser', (data) => {
//         users.push(data);
//         io.emit('newUserResponse', users);
//     });

//     socket.on('disconnect', () => {
//         console.log('🔥: A user disconnected');
//         // users = users.filter((user) => user.socketID !== socket.id);
//         // io.emit('newUserResponse', users);
//         socket.disconnect();
//     });
// });

const PORT = process.env.PORT || 3003;

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
