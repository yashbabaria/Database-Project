require("dotenv").config();

const express = require("express");

const app = express();

app.get("/", (req, res) =>{
    res.json({
        status: "success",
        page: "Home"
    })
});

app.get("/test", (req, res) =>{
    res.json({
        status: "success",
        page: "Test"
    })
});

const port = process.env.PORT || 8080;
app.listen(port, () =>{
    console.log("Server is up and running on " + port);
});

// http://localhost:3000/test