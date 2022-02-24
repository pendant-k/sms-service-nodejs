const express = require("express");
const { send_message } = require("./send");
const app = express();
const port = 3000;

console.log("SERVICE_ID", process.env.SERVICE_ID);

app.get("/", (req, res) => {
    res.send("hello world");
});

app.get("/sms/:phone/:password", (req, res) => {
    const paramObj = req.params;
    send_message(paramObj.phone, paramObj.password);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
