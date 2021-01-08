const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express config
const dirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3000

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(dirPath))




app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ninaad Lakshman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ninaad Lakshman'
    })
}) 

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.render('error', {
            message: 'Address must be provided.',
            name: 'Ninaad Lakshman'
        })
    }
    const whereabouts = geocode(req.query.address, (error, {latitude, longitude, place_name} = {}) => {
        if (!error) {
            const weather = forecast(latitude, longitude, (error, response2) => {
                res.send({
                    latitude,
                    longitude,
                    place_name,
                    forecast: response2.forecast,
                    temperature: response2.temperature,
                })
            })
        } else {
            res.send({
                error
            })
        }
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        res.render('error',{
            message: 'You must provide a search term.',
            name: 'Ninaad Lakshman'
        })
    } else {
        res.send({
            products: []
        })
    }
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Error!!!',
        title: 'Help',
        name: 'Ninaad Lakshman'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404error', {
        message: 'Help article not found',
        name: 'Ninaad Lakshman'
    })
})

app.get('*', (req, res) => {
    res.render('404error', {
        message: 'Page not found',
        name: 'Ninaad Lakshman'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})