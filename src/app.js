
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { request } = require('express')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()

// define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


// setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name:'umar'
    })
})


app.get('/about',(req,res) => {
    res.render('about',{
        title:'About me',
        name:'umar'
    }) 
})
app.get('/help', (req,res) => {
    res.render('help',{
        helpText:'This is some help text.',
        title:'Help',
        name:'umar'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'you must privide address to find weather'
        })
    } 

    geocode(req.query.address, (error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error})
        } 
        forecast(latitude,longitude, (error,forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })

    })

    // res.send({
    //     weather:'its awesome weather',
    //     location:'Rawalpindi',
    //     address:req.query.address
    // })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error:'you must privide search term'
        })
    } 
    console.log(req.query.search)

    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title:'404',
        name:'Umar',
        errorMessage:'Help article not found'
    })
})


app.get('*', (req,res) => {
    res.render('404',{
        title:'404',
        name:'Umar',
        errorMessage:'Page Not Found'
    })
})
//running server
app.listen(3000, () => {
    console.log('server is running on 3000')
})