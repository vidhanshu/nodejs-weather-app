//express is a function which will help us to create express application
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs')
const forecast = require("../utils/forecast.js");

// creating paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const pathToView = path.join(__dirname, "../views")
const pathToPartials = path.join(__dirname, "../partials");

// setting paths and engines
app.set("view engine", "hbs")
app.set("views", pathToView)
hbs.registerPartials(pathToPartials);

// this one is important we are registering our public folder to the express
app.use(express.static(publicDirectoryPath));

//all routes are defined here
app.get("/", (req, res) => {
    res.render('index', {
        name: "vidhanshu",
        title: "Home page for weather app",
    })
})

app.get("/about", (req, res) => {
    res.render('about', {
        name: "vidhanshu",
        title: "About page for weather app",
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        message: "Help page for weather app",
        name: "vidhanshu"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.render('weather', {
            temp: "23degC",
            title: "Weather page for weather app",
            name: "vidhanshu",
        })
    }

    forecast(req.query.address, (error, data) => {
        if (error) {
            res.send({ error })
        } else if (data.error) {
            res.send({ error: `'${req.query.address}' no such address allowed!` })
        }
        else {
            res.send(data)
        }
    })
})

app.get("/help/*", (req, res) => {
    res.render('404', {
        message: "Article not found",
        name: "vidhanshu",
    })
})

/* 404 page setup */
app.get("*", (req, res) => {
    res.render('404', {
        message: "Page named Not found",
    })
})

//to listen to the port in the browser
app.listen(3000, () => {
    console.log("Server is up on port 3000");
});