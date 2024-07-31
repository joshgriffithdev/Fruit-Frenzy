const express = require("express");
const cors = require("cors")
const dataRouter = require("./routes/data.route.js");



const server = express();


server.use(cors());

server.use("/", express.json());
server.use("/data", dataRouter);



server.listen(5555, () => {
    console.log("Server started");
});