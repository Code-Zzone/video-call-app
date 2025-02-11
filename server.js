const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + "/public")); // مجلد الملفات الثابتة

io.on("connection", (socket) => {
    console.log("📞 مستخدم متصل");

    socket.on("offer", (offer) => {
        socket.broadcast.emit("offer", offer);
    });

    socket.on("answer", (answer) => {
        socket.broadcast.emit("answer", answer);
    });

    socket.on("ice-candidate", (candidate) => {
        socket.broadcast.emit("ice-candidate", candidate);
    });

    socket.on("disconnect", () => {
        console.log("❌ مستخدم انفصل");
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 السيرفر يعمل على http://0.0.0.0:${PORT}`);
});


// server.listen(3000, () => {
//     console.log("🚀 السيرفر يعمل على http://localhost:3000");
// });
