const request = require('request')


const forecast = (latitude,longitude,callback) => {
    const forecasturl = 'http://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(latitude) +'&lon='+encodeURIComponent(longitude) +'&appid=ca7f6bf1a8f3409b44c142ae84ee0ecb'

    request({url:forecasturl,json:true}, (error,{body}) => {
        if(error){
            callback('unable to connect to weather service right now.',undefined)
        } else if(body.error){
            callback('unable to connect to weather service right now.',undefined)
        } else {
            const temp = body.main.temp
            const tempp = temp - 273
            callback(undefined,'Currently its feels like ' + tempp.toFixed(2)  + 'C temperature')
        }
    })
}

module.exports = forecast

