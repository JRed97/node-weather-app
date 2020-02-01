const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express(); //start express
const port = process.env.PORT || 3000; //use heroku port value or default to 3000

//Define paths for Express config
const pub_dir_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

//Setup HandleBars engine and views location
app.set("view engine", "hbs"); //set value for an express setting
app.set("views", views_path);
hbs.registerPartials(partials_path);

//setup static directory to serve
app.use(express.static(pub_dir_path));

//root
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Johann Redhead"
    });
});

//app.com/weather
app.get("/weather", (req, res) => {
    if(!req.query.address)
    {
        res.send({
            error: "You must provide an address"
        });
    }
    else
    {
        geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {
            if(error)
            {
                res.send({
                    error: error
                });
            }
            else
            {
                forecast(latitude, longitude, (error, forecast_data) => {
                    if(error)
                    {
                        res.send({
                            error: error
                        });
                    }
                    else
                    {
                        res.send({
                            forecast: forecast_data.summary,
                            precipitation: forecast_data.current_precip,
                            temp: forecast_data.current_temp,
                            address: req.query.address,
                            location: place
                        })
                    }
                });
            }
        });
    }
});

//app.com/about
app.get("/about", (req, res) => {
    res.render("about", {
        title: "Weather App",
        name: "Johann Redhead"
    });
});

app.get("/product", (req, res) => {
    if(!req.query.search)
    {
        res.send({
            error: "You must provide a search term"
        });
    }
    else
    {
        res.send({
            products: []
        });
    }
});

//app.com/help
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page!",
        name: "Johann Redhead",
        help_msg: "Visit this page when you're stuck my guy"
    });
});

//404 route handling
app.get("/help/*", (req, res) => {
    res.render("404", {
        name: "Johann Redhead",
        error_msg: "Help article not found."
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        name: "Johann Redhead",
        error_msg: "Page not found."
    });
});

//start server up
app.listen(port, () => {
    console.log("Server is up on port " + port + "!");
});