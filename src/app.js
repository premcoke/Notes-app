const express = require('express');
const path = require('path');
const geoObject = require('./geocode');
const hbs = require('hbs');
const publicPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partials = path.join(__dirname, '../templates/partials');
const app = express();

app.use(express.static(publicPath));
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partials);

app.get('', (req, res) => {
    res.render('index', { title: "Weather", content: 'This is Home page' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Need to provide an City address to fetch its weather details"
        })
    }
    geoObject.getGeoLocation(req.query.address, (error, data) => {
        if (error) {
            return res.send(error)
        } else {
            geoObject.getWeatherData(data.center[1], data.center[0], (error, data) => {
                if (error) {
                    return res.send(error)
                } else {
                    res.send(data);
                }
            })
        }
    })
});

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMessage: "About Page not found"
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMessage: "Page not found"
    })
});

app.listen(3000);