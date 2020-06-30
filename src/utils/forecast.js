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
        {callback(undefined,{
            temp:response.body.main.temp,
            fl:response.body.main.feels_like,
        humidity:response.body.main.humidity,
    wind_speed:response.body.wind.speed,
clouds:response.body.clouds.all})}
        })


}
module.exports=forecast