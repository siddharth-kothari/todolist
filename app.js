const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// app.use()

const app = express();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const taskSchema = {
    name: String
};

const Task = mongoose.model("Task", taskSchema);

const task1 = new Task({
    name: "Attend GRE Class"
});

const task2 = new Task({
    name: "Have breakfast"
});

const task3 = new Task({
    name: "Study"
});

const defaultTasks = [task1, task2, task3];

Task.insertMany(defaultTasks, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Success.")
    }

})

app.use(express.static("public"));
app.get("/", function(req, res) {

    let today = new Date();
    let options_day = {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric"
    };


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