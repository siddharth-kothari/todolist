const express = require("express");
const bodyParser = require("body-parser");

// app.use()

const app = express();
let tasks = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.get("/", function(req, res) {
    let today = new Date();
    let options_day = {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric"
    };

    // let options_time = {
    //     hour: "numeric",
    //     minute: "numeric"
    // };

    let day = today.toLocaleDateString("en-US", options_day);
    //let time = today.toLocaleTimeString("en-US", options_time);

    res.render("list", { kindOfDay: day, currentTime: time, newListTasks: tasks });
});

app.post("/", function(req, res) {
    let task = req.body.newTask;
    tasks.push(task);
    res.redirect("/");
});

app.listen(3000, function() {
    console.log("Server is running onn port 3000.")
});