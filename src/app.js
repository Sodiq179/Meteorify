const path = require('path')
const express = require('express')
const hbs = require("hbs")
const geocode = require('./utils/geocode');
const weatherinfo = require('./utils/weatherinfo');

// meteorify.com        --root--
// meteorify.com/help   --routes--
// meteorify.com/about  --routes--
const app = express()

// Path defination for express config
const  publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setting up handlebars engine and view locations
app.set('view engine','hbs') // Setting up handlebars
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Settingup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Meteorify',
        name: 'Sodiq Babawale'
    })
})

app.get('/about', (req, res) => {
    res.redirect("https://github.com/Sodiq179")
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'We are ready to help at meteorify :)',
        name: 'Sodiq Babawale'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error:"You must provide an address term"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
    
        weatherinfo(latitude, longitude, (error, weatherData) => {
            if (error) {
                return res.send({
                    error
                })
            }
    
            res.send({
                location,
                weather:weatherData,
                address:req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Error 404 Page",
        name: "Sodiq Babawale",
        errorMessage: "Article Page not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "Error 404 Page",
        name: "Sodiq Babawale",
        errorMessage: "Page not found"
    })
})


//Start up the server
app.listen(3000, () => {
    console.log("Server is up on port 3000")
})