const request=require("request")
const forecast=(lat,long,callback)=>{
    const url="http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&units=metric&appid=b8f83dad95ebccf4806b39365abaf776"
    request({ url: url,json:true }, (error, response) => {
        if(error)
        {
            callback("error in connecting",undefined)
        }
        else if(response.body.error)
        {callback("unable to find location",undefined)}
        
        else
        {callback(undefined," It is currently "+response.body.main.temp+" degrees out.Though while standing outside it will feel like its "+response.body.main.feels_like+" degrees.Humidity is "+response.body.main.humidity+" %.Wind speed is "+response.body.wind.speed+" Km/h.There is "+response.body.clouds.all+" % chance of rain today"
           )}
        })
       

}
module.exports=forecast